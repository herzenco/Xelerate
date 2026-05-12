"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createBlogTopic,
  createDraftFromTopic,
  setPostStatus,
  toggleBlogTopic,
  updateAdminPost,
} from "@/lib/admin/content-store";
import { generateBlogDraft } from "@/lib/admin/blog-generator";
import { assertAdmin } from "@/lib/admin/auth";

function splitTags(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createTopicAction(formData: FormData) {
  await assertAdmin();
  await createBlogTopic(String(formData.get("topic") ?? ""));
  revalidatePath("/admin/content/topics");
}

export async function toggleTopicAction(formData: FormData) {
  await assertAdmin();
  await toggleBlogTopic(String(formData.get("topicId") ?? ""));
  revalidatePath("/admin/content/topics");
}

export async function createDraftAction(formData: FormData) {
  await assertAdmin();
  const postId = await createDraftFromTopic(String(formData.get("topicId") ?? "") || undefined);
  revalidatePath("/admin/content");

  if (postId) {
    redirect(`/admin/content/${postId}`);
  }
}

export async function generateClaudeDraftAction() {
  await assertAdmin();
  let postId: string;

  try {
    const result = await generateBlogDraft();
    postId = result.postId;
  } catch (error) {
    const message =
      error instanceof Error
        ? encodeURIComponent(error.message)
        : "generation-failed";
    redirect(`/admin/content?generationError=${message}`);
  }

  revalidatePath("/admin/content");
  redirect(`/admin/content/${postId}`);
}

export async function savePostAction(formData: FormData) {
  await assertAdmin();
  const postId = String(formData.get("postId") ?? "");

  await updateAdminPost(postId, {
    title: String(formData.get("title") ?? "").trim(),
    slug: normalizeSlug(String(formData.get("slug") ?? "")),
    tags: splitTags(formData.get("tags")),
    metaDescription: String(formData.get("metaDescription") ?? "").trim(),
    bodyMarkdown: String(formData.get("bodyMarkdown") ?? ""),
    editorsNote: String(formData.get("editorsNote") ?? "").trim(),
  });

  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${postId}`);
}

export async function approvePostAction(formData: FormData) {
  await assertAdmin();
  const postId = String(formData.get("postId") ?? "");
  const editorsNote = String(formData.get("editorsNote") ?? "").trim();

  if (editorsNote.length < 50) {
    redirect(`/admin/content/${postId}?error=editors-note`);
  }

  await savePostAction(formData);
  await setPostStatus(postId, "approved");
  revalidatePath("/admin/content");
  redirect(`/admin/content/${postId}`);
}

export async function publishPostAction(formData: FormData) {
  await assertAdmin();
  const postId = String(formData.get("postId") ?? "");
  const editorsNote = String(formData.get("editorsNote") ?? "").trim();

  if (editorsNote.length < 50) {
    redirect(`/admin/content/${postId}?error=editors-note`);
  }

  await savePostAction(formData);
  await setPostStatus(postId, "published", {
    publishedAt: new Date().toISOString(),
  });
  revalidatePath("/admin/content");
  redirect(`/admin/content/${postId}`);
}

export async function schedulePostAction(formData: FormData) {
  await assertAdmin();
  const postId = String(formData.get("postId") ?? "");
  const editorsNote = String(formData.get("editorsNote") ?? "").trim();
  const publishAt = String(formData.get("publishAt") ?? "");

  if (editorsNote.length < 50) {
    redirect(`/admin/content/${postId}?error=editors-note`);
  }

  await savePostAction(formData);
  await setPostStatus(postId, "scheduled", {
    publishAt: publishAt ? new Date(publishAt).toISOString() : null,
  });
  revalidatePath("/admin/content");
  redirect(`/admin/content/${postId}`);
}

export async function rejectPostAction(formData: FormData) {
  await assertAdmin();
  const postId = String(formData.get("postId") ?? "");

  await updateAdminPost(postId, {
    rejectionReason: String(formData.get("rejectionReason") ?? "").trim(),
  });
  await setPostStatus(postId, "rejected");
  revalidatePath("/admin/content");
  redirect(`/admin/content/${postId}`);
}

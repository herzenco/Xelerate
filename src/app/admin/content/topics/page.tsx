import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createDraftAction, createTopicAction, toggleTopicAction } from "../actions";
import { listBlogTopics } from "@/lib/admin/content-store";

export const metadata: Metadata = {
  title: "Topic Seeds",
};

export const dynamic = "force-dynamic";

export default async function AdminTopicsPage() {
  const topics = await listBlogTopics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Topic Seeds</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Lupe will manage active blog topic seeds here. Least-recently-used
          selection and tag guardrails are part of the generation pipeline.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add topic seed</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createTopicAction} className="flex flex-col gap-3 sm:flex-row">
            <Input
              name="topic"
              placeholder="e.g. How fractional PMs help founders make roadmap tradeoffs"
              required
            />
            <Button type="submit">Add seed</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Seed list</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Topic</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Last used</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id} className="border-t border-border">
                    <td className="px-4 py-4">{topic.topic}</td>
                    <td className="px-4 py-4">
                      <Badge variant={topic.active ? "default" : "secondary"}>
                        {topic.active ? "Active" : "Paused"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {topic.lastUsedAt
                        ? new Date(topic.lastUsedAt).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <form action={createDraftAction}>
                          <input type="hidden" name="topicId" value={topic.id} />
                          <Button type="submit" size="sm" variant="outline">
                            Draft
                          </Button>
                        </form>
                        <form action={toggleTopicAction}>
                          <input type="hidden" name="topicId" value={topic.id} />
                          <Button type="submit" size="sm" variant="ghost">
                            {topic.active ? "Pause" : "Activate"}
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

async function importTsModule(relativePath) {
  const sourcePath = path.join(process.cwd(), relativePath);
  assert.equal(existsSync(sourcePath), true, `${relativePath} should exist`);

  const output = ts.transpileModule(readFileSync(sourcePath, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2020,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    },
  }).outputText;

  const modulePath = path.join(tmpdir(), `admin-account-rules-${Date.now()}.mjs`);
  await import("node:fs/promises").then(({ writeFile }) => writeFile(modulePath, output));
  return import(modulePath);
}

test("isXelerateAdminEmail only accepts xelerate.me email addresses", async () => {
  const { isXelerateAdminEmail, normalizeAdminEmail } = await importTsModule(
    "src/lib/admin/account-rules.ts",
  );

  assert.equal(normalizeAdminEmail(" Admin@Xelerate.me "), "admin@xelerate.me");
  assert.equal(isXelerateAdminEmail("admin@xelerate.me"), true);
  assert.equal(isXelerateAdminEmail("admin+ops@xelerate.me"), true);
  assert.equal(isXelerateAdminEmail("admin@other.com"), false);
  assert.equal(isXelerateAdminEmail("admin@notxelerate.me"), false);
  assert.equal(isXelerateAdminEmail("not-an-email"), false);
});

import { mkdirSync, mkdtempSync, writeFileSync, rmSync, readdirSync } from "fs";
import { copy } from "./copy";
import { join } from "path";

describe("copy", () => {
  let tempDir: string;
  beforeEach(() => {
    mkdirSync(".temp", { recursive: true });
    tempDir = mkdtempSync(".temp/git-status-check-test-");
  });
  afterEach(() => {
    rmSync(tempDir, { force: true, recursive: true });
  });
  test("copies all files by default, creating the destination if required", async () => {
    const src = join(tempDir, "src");
    const dest = join(tempDir, "dest");
    mkdirSync(src);
    writeFileSync(join(src, "a.txt"), "a", "utf-8");

    await copy(src, [], dest);

    const actualFiles = readdirSync(dest);
    // Check the list of files in the destination
    expect(actualFiles).toEqual(["a.txt"]);
  });

  test("select files explicitly", async () => {
    const src = join(tempDir, "src");
    const dest = join(tempDir, "dest");
    mkdirSync(src);
    writeFileSync(join(src, "a.txt"), "a", "utf-8");
    writeFileSync(join(src, "b.txt"), "b", "utf-8");

    await copy(src, ["a.txt"], dest);

    const actualFiles = readdirSync(dest);
    // Check the list of files in the destination
    expect(actualFiles).toEqual(["a.txt"]);
  });

  test("exclude pattern", async () => {
    const src = join(tempDir, "src");
    const dest = join(tempDir, "dest");
    mkdirSync(src);
    writeFileSync(join(src, "a.txt"), "a", "utf-8");
    writeFileSync(join(src, "b.txt"), "b", "utf-8");

    await copy(src, ["**", "!b.txt"], dest);

    const actualFiles = readdirSync(dest);
    // Check the list of files in the destination
    expect(actualFiles).toEqual(["a.txt"]);
  });

  test("maintains directory structure", async () => {
    const src = join(tempDir, "src");
    const dest = join(tempDir, "dest");
    mkdirSync(join(src, "a"), { recursive: true });
    writeFileSync(join(src, "a", "a.txt"), "a", "utf-8");

    await copy(src, ["**"], dest);

    const actualFiles = readdirSync(join(dest, "a"));
    // Check the list of files in the destination
    expect(actualFiles).toEqual(["a.txt"]);
  });
});

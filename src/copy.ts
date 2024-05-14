import * as glob from "fast-glob";
import { copyFileSync, mkdirSync, constants } from "fs";
import { dirname, join } from "path";

export async function copy(src: string, paths: string[], dest: string) {
  if (paths.length === 0) {
    paths = ["**"];
  }
  const matches = glob.globStream(paths, { cwd: src, onlyFiles: true });
  for await (const file of matches) {
    const fileStr = Buffer.isBuffer(file) ? file.toString("utf-8") : file;
    const srcPath = join(src, fileStr);
    const destPath = join(dest, fileStr);
    const destDir = dirname(destPath);
    // Ensure dir exists
    mkdirSync(destDir, { recursive: true });
    // Copy file
    copyFileSync(srcPath, destPath, constants.COPYFILE_EXCL);
  }
}

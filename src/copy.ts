import * as action from "@actions/core";
import * as glob from "fast-glob";
import { copyFileSync, mkdirSync, constants } from "fs";
import { dirname, join } from "path";

export async function copy(src: string, paths: string[], dest: string) {
  if (paths.length === 0) {
    paths = ["**"];
  }
  action.debug(`Expanding paths:\n${paths.join("\n")}`);
  const matches = glob.globStream(paths, { cwd: src, onlyFiles: true });
  let count = 0;
  for await (const file of matches) {
    const fileStr = Buffer.isBuffer(file) ? file.toString("utf-8") : file;
    const srcPath = join(src, fileStr);
    const destPath = join(dest, fileStr);
    const destDir = dirname(destPath);
    action.debug(`Copying ${srcPath} to ${destPath}`);
    // Ensure dir exists
    mkdirSync(destDir, { recursive: true });
    // Copy file
    copyFileSync(srcPath, destPath, constants.COPYFILE_EXCL);
    count++;
  }
  action.debug(`Copied ${count} files`);
  return count;
}

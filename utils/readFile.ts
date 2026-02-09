import { readFileSync } from "fs";

/**
 * Reads a file from the project root directory.
 * @param filePath - Path relative to the project root.
 * @returns File contents as a string.
 */
export function readFile(filePath: string): string {
  return readFileSync(`${process.cwd()}/${filePath}`, "utf-8");
}

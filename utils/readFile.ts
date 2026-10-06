import type { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { readFileSync } from "fs";
import pathTool from "path";

/**
 * Reads a file from the project root directory.
 * @param filePath - Path relative to the project root.
 * @returns File contents as a string.
 */
export function readFile(filePath: string): string {
  return readFileSync(pathTool.join(process.cwd(), filePath), "utf-8");
}

/**
 * Reads the entities from an entity's static load file.
 * @param entityConfig - Entity config.
 * @returns entities from the static load file.
 */
export function readStaticLoadFile<T>(entityConfig: EntityConfig): T[] {
  const { label, staticLoadFile } = entityConfig;
  if (!staticLoadFile) {
    throw new Error(`staticLoadFile not found for entity ${label}`);
  }
  return Object.values(JSON.parse(readFile(staticLoadFile)));
}

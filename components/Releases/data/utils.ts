import { resolveRelativeDirs } from "@databiosphere/findable-ui/lib/utils/mdx/files/resolveRelativeDirs";
import fs from "fs";
import { RELEASE_DATA_TO_FILE_MAP } from "./constants";
import { ReleaseData } from "./types";

/**
 * Retrieves release data from JSON files based on the provided slug.
 * JSON files are expected to be located in the same directory as the MDX file,
 * with filenames defined in RELEASE_DATA_TO_FILE_MAP.
 * @param slug - Page slug segments.
 * @returns An object containing the release data.
 */
export function getReleaseData(slug: string[]): ReleaseData {
  const data: ReleaseData = {};
  const slugBasePath = slug.slice(0, -1);

  Object.entries(RELEASE_DATA_TO_FILE_MAP).forEach(([key, fileName]) => {
    const path = resolveRelativeDirs([...slugBasePath, `${fileName}.json`]);
    if (!fs.existsSync(path)) return;
    const json = JSON.parse(fs.readFileSync(path, "utf-8"));
    data[key as keyof ReleaseData] = json;
  });

  return data;
}

import { GetStaticPathsResult } from "next/types";
import pathTool from "path";
import { DOC_SITE_FOLDER_NAME } from "./constants";
import { mapSlugByFilePaths } from "./utils";

/**
 * Generates static paths for the documentation site, for the specified relative path.
 * @param relativePath - Relative path.
 * @returns static paths.
 */
export function generateStaticPaths(
  relativePath = ""
): GetStaticPathsResult["paths"] {
  const docPath = resolveDocPath(relativePath);
  const slugByFilePaths = mapSlugByFilePaths(docPath);
  return [...slugByFilePaths].map(([, slug]) => {
    return {
      params: { slug },
    };
  });
}

/**
 * Resolves the absolute path to a specific subdirectory within the documentation folder.
 * @param relativePath - Relative path.
 * @returns The absolute path to the specified subdirectory within the documentation folder.
 */
export function resolveDocPath(relativePath: string): string {
  return pathTool.join(process.cwd(), DOC_SITE_FOLDER_NAME, relativePath);
}

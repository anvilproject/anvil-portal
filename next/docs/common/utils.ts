import { NavItem } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Nav/nav";
import fs from "fs";
import { GetStaticPathsResult } from "next/types";
import pathTool, * as path from "path";
import { navigation as navigationConfig } from "../../site-config/anvil-portal/dev/navigation";
import { DOC_SITE_FOLDER_NAME } from "./constants";
import { NavigationKey, NavigationNode, SlugByFilePath } from "./entities";

/**
 * Returns the path to the "docs" directory.
 * @returns path to the "docs" directory.
 */
export function getDocsDirectory(): string {
  return pathTool.join(process.cwd(), DOC_SITE_FOLDER_NAME);
}

/**
 * Returns the active URL for the given page path.
 * @param pagePath - Page path.
 * @param navigation - Navigation.
 * @returns the active URL for the given page path and navigation.
 */
function getActiveURL(pagePath: string, navigation?: NavItem[]): string {
  // Find all URLs with either an exact or partial match.
  // Sort the matches; to facilitate finding of an exact match before a partial match.
  // For example, /consortia/cser/news/2020/08/01 may be a partial match for /consortia/cser and /consortia/cser/news.
  const activeURLs = navigation
    ?.map(({ url }) => url)
    .filter((url): url is string => !!url)
    .filter((url) => pagePath.startsWith(url))
    .sort(); // Sort the URLs for ease of comparison with page path.;

  // No active URLs are found.
  if (!activeURLs || activeURLs.length === 0) {
    return "";
  }

  // Returns either an exact match, or if no exact match is found, the partial match.
  return activeURLs.find((url) => pagePath === url) || activeURLs.pop() || "";
}

/**
 * Returns the navigation items with the active flag set to true if the URL matches the active URL.
 * @param activeURL - Active URL.
 * @param navigation - Navigation.
 * @returns the navigation items with the active flag set to true if the URL matches the active URL.
 */
function getNavItems(
  activeURL: string,
  navigation?: NavItem[]
): NavItem[] | undefined {
  return navigation?.map((navItem) => {
    if (activeURL === navItem.url) {
      return { ...navItem, active: true };
    }
    return navItem;
  });
}

/**
 * Returns the navigation config for the given slug.
 * @param slug - Slug.
 * @returns the navigation config for the slug.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity -- TODO?
export function getNavigationConfig(
  slug?: string[]
): Omit<NavigationNode, "key" | "slugs"> | undefined {
  if (!slug) {
    return;
  }
  const sectionMap = navigationConfig[slug[0] as NavigationKey];
  // Loop through the slug and find the node where slug matches the node's slug.
  for (let i = 0; i < slug.length; i++) {
    const key = slug[i];
    for (const { hero, navigation, slugs } of sectionMap.nodes) {
      if (slugs.includes(key)) {
        if (slug.length !== 1 && i === 0) {
          // Although the first slug's key is a match, continue if the slug has more than one element.
          continue;
        }
        const pagePath = `/${slug.join("/")}`;
        const activeURL = getActiveURL(pagePath, navigation);
        if (activeURL) {
          const navItems = getNavItems(activeURL, navigation);
          return { hero, navigation: navItems };
        }
      }
    }
  }
}

/**
 * Returns true if the file is an MDX file.
 * @param fileName - File name.
 * @returns true if the file is an MDX file.
 */
function isMdxFile(fileName: string): boolean {
  return fileName.endsWith(".mdx");
}

/**
 * Maps each MDX file path to its slug.
 * @param dirPath - Directory path.
 * @param slugByFilePath - Accumulator: Map of slug by mdx file path.
 * @returns returns slug by mdx file path.
 */
function mapSlugByFilePath(
  dirPath: string,
  slugByFilePath: SlugByFilePath = new Map()
): SlugByFilePath {
  const dirents = fs.readdirSync(dirPath, { withFileTypes: true });
  const docsDirectory = getDocsDirectory();
  return dirents.reduce((acc, dirent) => {
    /* Accumulate the slug for each MDX file. */
    if (dirent.isFile() && isMdxFile(dirent.name)) {
      const mdxPath = path.resolve(dirPath, dirent.name);
      /* Build the slug from the file relative directory and file name. */
      const mdxRelativePath = path.relative(docsDirectory, mdxPath);
      const { dir, name } = path.parse(mdxRelativePath);
      let slug = [] as string[];
      if (dir) {
        slug = dir.split(path.sep);
      }
      slug.push(name);
      acc.set(mdxPath, slug);
    }
    /* Recurse into subdirectories. */
    if (dirent.isDirectory()) {
      mapSlugByFilePath(path.resolve(dirPath, dirent.name), acc);
    }
    return acc;
  }, slugByFilePath);
}

/**
 * Returns the static paths for each mdx content in the "docs" directory.
 * @returns the static paths for the mdx content.
 */
export function generatePaths(): GetStaticPathsResult["paths"] {
  const docsDirectory = getDocsDirectory();
  const slugByFileName = mapSlugByFilePath(docsDirectory);
  return [...slugByFileName].map(([, slug]) => {
    return {
      params: { slug },
    };
  });
}

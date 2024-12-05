import {
  LAYOUT_STYLE_CONTRAST_LIGHT,
  LAYOUT_STYLE_CONTRAST_LIGHTEST,
  LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
  LAYOUT_STYLE_NO_CONTRAST_LIGHT,
  LAYOUT_STYLE_NO_CONTRAST_LIGHTEST,
} from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPropsContext } from "next";
import { GetStaticPathsResult } from "next/types";
import pathTool, * as path from "path";
import { Frontmatter } from "../../content/entities";
import { navigation as navigationConfig } from "../../site-config/anvil-portal/dev/navigation/navigation";
import { DOC_SITE_FOLDER_NAME } from "./constants";
import {
  Navigation,
  NavigationKey,
  NavigationNode,
  SlugByFilePaths,
} from "./entities";

/**
 * Returns the page slug for the given static props context and section.
 * @param props - Static props context.
 * @param section - Document section e.g. "learn".
 * @returns page slug.
 */
export function buildPageSlug(
  props: GetStaticPropsContext,
  section?: string
): string[] | undefined {
  const slug = props.params?.slug;
  if (!slug || typeof slug === "string") return;
  if (section) return [section, ...slug];
  return slug;
}

/**
 * Returns MDX content and frontmatter from the given slug.
 * @param slug - Slug.
 * @returns MDX content and frontmatter.
 */
export function extractMDXFrontmatter(
  slug: string[]
): matter.GrayMatterFile<string> {
  const markdownWithMeta = fs.readFileSync(
    getMDXFilePath(slug, getDocsDirectory()),
    "utf-8"
  );
  return matter(markdownWithMeta);
}

/**
 * Filters out headings (H1, and H3-H6) from the outline.
 * @param outline - Outline item.
 * @returns true if the heading depth is 2 or 3.
 */
export function filterOutline(outline: OutlineItem): boolean {
  return outline.depth > 1 && outline.depth < 4;
}

/**
 * Returns the static paths for each mdx content in the "docs" directory.
 * @returns the static paths for the mdx content.
 */
export function generatePaths(): GetStaticPathsResult["paths"] {
  const docsDirectory = getDocsDirectory();
  const slugByFilePaths = mapSlugByFilePaths(docsDirectory);
  return [...slugByFilePaths].map(([, slug]) => {
    return {
      params: { slug },
    };
  });
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
    .sort(); // Sort the URLs for ease of comparison with page path.

  // No active URLs are found.
  if (!activeURLs || activeURLs.length === 0) {
    return "";
  }

  // Returns either an exact match, or if no exact match is found, the partial match.
  return activeURLs.find((url) => pagePath === url) || activeURLs.pop() || "";
}

/**
 * Returns the path to the "docs" directory.
 * @returns path to the "docs" directory.
 */
export function getDocsDirectory(): string {
  return pathTool.join(process.cwd(), DOC_SITE_FOLDER_NAME);
}

/**
 * Returns MDX file path for the given slug.
 * @param slug - Slug.
 * @param docsDirectory - Docs directory.
 * @returns MDX file path.
 */
function getMDXFilePath(
  slug: string[] = [],
  docsDirectory = getDocsDirectory()
): string {
  return pathTool.join(docsDirectory, ...slug) + ".mdx";
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
    for (const { hero, layoutStyle, navigation, slugs } of sectionMap.nodes) {
      if (slugs.includes(key)) {
        if (slug.length !== 1 && i === 0) {
          // Although the first slug's key is a match, continue if the slug has more than one element.
          continue;
        }
        // Return the layout styles; navigation (and therefore hero) are undefined.
        if (!navigation) {
          return { layoutStyle };
        }
        const pagePath = `/${slug.join("/")}`;
        const activeURL = getActiveURL(pagePath, navigation);
        if (activeURL) {
          const navItems = getNavItems(activeURL, navigation);
          return { hero, layoutStyle, navigation: navItems };
        }
      }
    }
  }
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
 * Returns the static prop "layoutStyle", if specified from the frontmatter; otherwise defaults to configured layoutStyle.
 * @param layoutStyle - Layout style.
 * @param frontmatter - Frontmatter.
 * @returns layout style.
 */
export function getStaticPropLayoutStyle(
  layoutStyle: LayoutStyle | null,
  frontmatter: Frontmatter | undefined
): LayoutStyle | null {
  switch (frontmatter?.layoutStyle) {
    case "LAYOUT_STYLE_CONTRAST_LIGHT":
      return LAYOUT_STYLE_CONTRAST_LIGHT;
    case "LAYOUT_STYLE_CONTRAST_LIGHTEST":
      return LAYOUT_STYLE_CONTRAST_LIGHTEST;
    case "LAYOUT_STYLE_NO_CONTRAST_DEFAULT":
      return LAYOUT_STYLE_NO_CONTRAST_DEFAULT;
    case "LAYOUT_STYLE_NO_CONTRAST_LIGHT":
      return LAYOUT_STYLE_NO_CONTRAST_LIGHT;
    case "LAYOUT_STYLE_NO_CONTRAST_LIGHTEST":
      return LAYOUT_STYLE_NO_CONTRAST_LIGHTEST;
    default:
      return layoutStyle;
  }
}

/**
 * Returns the static prop "navigation" from navigation configuration.
 * If the frontmatter enableNavigation is false, the returned value is null.
 * @param navigation - Navigation configuration.
 * @param frontmatter - Frontmatter.
 * @returns navigation.
 */
export function getStaticPropNavigation(
  navigation: Navigation[] | null,
  frontmatter: Frontmatter
): Navigation[] | null {
  if (frontmatter.enableNavigation) return navigation;
  return null;
}

/**
 * Returns the static prop "outline" from plugin-generated outline items, or the frontmatter outline, where the
 * frontmatter outline takes precedence over plugin-generated outline.
 * If the frontmatter enableOutline is false, the outline is returned as an empty array.
 * @param outline - Plugin-generated outline items.
 * @param frontmatter - Frontmatter.
 * @returns outline.
 */
export function getStaticPropOutline(
  outline: OutlineItem[],
  frontmatter: Frontmatter
): OutlineItem[] {
  if (frontmatter.enableOutline) {
    if ("outline" in frontmatter) return frontmatter.outline ?? [];
    if (outline.length > 0) return outline.filter(filterOutline);
  }
  return [];
}

/**
 * Frontmatter type guard.
 * @param data - Grey matter file data.
 * @returns true if the data is frontmatter.
 */
function isFrontmatter(data: unknown): data is Frontmatter {
  if (!data) return false;
  return typeof data === "object" && "title" in data;
}

/**
 * Returns true if the file is an MDX file.
 * @param fileName - File name.
 * @returns true if the file is an MDX file.
 */
function isMdxFile(fileName: string): boolean {
  return fileName.endsWith(".mdx") || fileName.endsWith(".md"); // TODO(cc) update to use .mdx only once md is removed.
}

/**
 * Maps each MDX file path to its slug.
 * @param docsDirectory - Docs directory.
 * @param dirPath - Directory path.
 * @param slugByFilePaths - Accumulator: Map of slug by mdx file path.
 * @returns returns slug by mdx file path.
 */
export function mapSlugByFilePaths(
  docsDirectory: string,
  dirPath = docsDirectory,
  slugByFilePaths: SlugByFilePaths = new Map()
): SlugByFilePaths {
  const dirents = fs.readdirSync(dirPath, { withFileTypes: true });
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
      mapSlugByFilePaths(
        docsDirectory,
        path.resolve(dirPath, dirent.name),
        acc
      );
    }
    return acc;
  }, slugByFilePaths);
}

/**
 * Returns the frontmatter from the given grey matter file data.
 * @param data - Grey matter file data.
 * @returns frontmatter.
 */
export function parseFrontmatter(
  data: matter.GrayMatterFile<string>["data"]
): Frontmatter | undefined {
  if (isFrontmatter(data)) {
    const {
      enableContentEnd = true,
      enableNavigation = true, // Remove default when "learn" UI is updated.
      enableOutline = true,
      enableOverview = false,
      enableSupportForum = false,
    } = data;
    return {
      enableContentEnd,
      enableNavigation,
      enableOutline,
      enableOverview,
      enableSupportForum,
      ...data,
    };
  }
}

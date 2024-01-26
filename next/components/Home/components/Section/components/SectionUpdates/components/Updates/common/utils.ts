import { Frontmatter } from "../../../../../../../../../content/entities";
import {
  buildEventDateField,
  buildNewsDateField,
  formatDate,
  getContentDirectory,
  getFrontmatterByPaths,
  isFeatured,
  isFrontmatterEvent,
} from "../../../../../../../../../content/utils";
import { mapSlugByFilePaths } from "../../../../../../../../../docs/common/utils";
import { PORTAL_URL } from "../../../../../../../../../site-config/anvil-portal/dev/config";
import { SectionCard } from "../../../../../../../common/entities";
import { NormalizedFrontmatter } from "./entities";

/**
 * Returns the content section cards for the given directory.
 * @param dirName - Directory name.
 * @returns content section cards.
 */
export function buildContentSectionCards(dirName: string): SectionCard[] {
  const slugByFilePaths = mapSlugByFilePaths(getContentDirectory(dirName));
  const frontmatterByPaths = getFrontmatterByPaths(slugByFilePaths, dirName);
  return [...frontmatterByPaths]
    .map(normalizeFrontmatter)
    .filter(filterFrontmatter)
    .sort(sortFrontmatter)
    .map(mapUpdateCard);
}

/**
 * Returns true if the frontmatter is featured, and the date is defined.
 * @param frontmatter - Frontmatter.
 * @returns true if the frontmatter is featured, and the date is defined.
 */
function filterFrontmatter(frontmatter: NormalizedFrontmatter): boolean {
  return Boolean(frontmatter.date && frontmatter.featured);
}

/**
 * Returns the formatted date for the content card.
 * @param frontmatter - Frontmatter.
 * @returns formatted date.
 */
function getFrontmatterDate(frontmatter: Frontmatter): Date | undefined {
  // Return formatted date for "event" related frontmatter.
  if (isFrontmatterEvent(frontmatter)) {
    return buildEventDateField(frontmatter);
  }
  // Return formatted date for "news" related frontmatter.
  return buildNewsDateField(frontmatter);
}

/**
 * Returns the content section card for the specified frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns content section card.
 */
function mapUpdateCard(frontmatter: NormalizedFrontmatter): SectionCard {
  return {
    links: [{ label: null, url: `${PORTAL_URL}/${frontmatter.path}` }],
    secondaryText: formatDate(frontmatter.date),
    text: frontmatter.description,
    title: frontmatter.title,
  };
}

/**
 * Returns the normalized frontmatter for either "event" or "news" related frontmatter.
 * @param pathFrontmatter - Tuple containing path and associated frontmatter.
 * @returns normalized frontmatter.
 */
function normalizeFrontmatter(
  pathFrontmatter: [string, Frontmatter]
): NormalizedFrontmatter {
  const [path, frontmatter] = pathFrontmatter;
  const { description, title } = frontmatter;
  const date = getFrontmatterDate(frontmatter);
  const featured = isFeatured(frontmatter);
  return {
    date,
    description,
    featured,
    path,
    title,
  };
}

/**
 * Sorts the frontmatter by date.
 * @param d0 - First date to compare.
 * @param d1 - Second date to compare.
 * @returns number indicating sort precedence of d0 vs d1.
 */
function sortFrontmatter(
  d0: NormalizedFrontmatter,
  d1: NormalizedFrontmatter
): number {
  return (d0.date ?? new Date(0)) > (d1.date ?? new Date(0)) ? -1 : 1;
}

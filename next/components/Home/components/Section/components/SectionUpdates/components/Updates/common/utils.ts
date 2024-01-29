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
import { CardFrontmatter } from "./entities";

/**
 * Returns the content section cards for the given directory.
 * @param dirName - Directory name.
 * @returns content section cards.
 */
export function buildUpdateSectionCards(dirName: string): SectionCard[] {
  const slugByFilePaths = mapSlugByFilePaths(getContentDirectory(dirName));
  const frontmatterByPaths = getFrontmatterByPaths(slugByFilePaths, dirName);
  return [...frontmatterByPaths]
    .map(mapToCardFrontmatter)
    .filter(filterFrontmatter)
    .sort(sortFrontmatter)
    .map(mapToSectionCard);
}

/**
 * Returns true if the frontmatter is featured, and the date is defined.
 * @param frontmatter - Frontmatter.
 * @returns true if the frontmatter is featured, and the date is defined.
 */
function filterFrontmatter(frontmatter: CardFrontmatter): boolean {
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
 * Returns the normalized frontmatter for either "event" or "news" related frontmatter.
 * @param pathFrontmatter - Tuple containing path and associated frontmatter.
 * @returns normalized frontmatter.
 */
function mapToCardFrontmatter(
  pathFrontmatter: [string, Frontmatter]
): CardFrontmatter {
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
 * Returns the content section card for the specified frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns content section card.
 */
function mapToSectionCard(frontmatter: CardFrontmatter): SectionCard {
  return {
    links: [{ label: null, url: `${PORTAL_URL}/${frontmatter.path}` }],
    secondaryText: formatDate(frontmatter.date),
    text: frontmatter.description,
    title: frontmatter.title,
  };
}

/**
 * Sorts the frontmatter by date.
 * @param d0 - First date to compare.
 * @param d1 - Second date to compare.
 * @returns number indicating sort precedence of d0 vs d1.
 */
function sortFrontmatter(d0: CardFrontmatter, d1: CardFrontmatter): number {
  return (d0.date ?? new Date(0)) > (d1.date ?? new Date(0)) ? -1 : 1;
}

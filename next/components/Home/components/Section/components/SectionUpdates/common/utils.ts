import { DATE_FORMAT } from "../../../../../../../content/constants";
import { Frontmatter } from "../../../../../../../content/entities";
import {
  buildMomentField,
  getContentDirectory,
  getFrontmatterByPaths,
  isFeatured,
} from "../../../../../../../content/utils";
import { mapSlugByFilePaths } from "../../../../../../../docs/common/utils";
import { CardFrontmatter, UpdateCard } from "./entities";

/**
 * Returns the update section cards for the given directory.
 * @param dirName - Directory name.
 * @returns update section cards.
 */
export function buildUpdateSectionCards(dirName: string): UpdateCard[] {
  const slugByFilePaths = mapSlugByFilePaths(getContentDirectory(dirName));
  const frontmatterByPaths = getFrontmatterByPaths(slugByFilePaths, dirName);
  return processUpdateSectionCards([...frontmatterByPaths]);
}

/**
 * Returns true if the frontmatter is featured, not hidden, and the date is defined.
 * @param frontmatter - Frontmatter.
 * @returns true if the frontmatter is featured, not hidden, and the date is defined.
 */
function filterFrontmatter(frontmatter: CardFrontmatter): boolean {
  return Boolean(
    frontmatter.date && frontmatter.featured && !frontmatter.hidden
  );
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
  const { description, hidden = false, title } = frontmatter;
  const moment = buildMomentField(frontmatter);
  const date = moment?.toDate();
  const featured = isFeatured(frontmatter);
  const secondaryText = moment?.format(DATE_FORMAT); // Formatted date field.
  return {
    date,
    description,
    featured,
    hidden,
    path,
    secondaryText,
    title,
  };
}

/**
 * Returns the content section card for the specified frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns content section card.
 */
function mapToSectionCard(frontmatter: CardFrontmatter): UpdateCard {
  return {
    date: frontmatter.date?.toISOString(),
    link: { label: null, url: frontmatter.path.replace(/^(?!\/)/, "/") },
    secondaryText: frontmatter.secondaryText,
    text: frontmatter.description,
    title: frontmatter.title,
  };
}

/**
 * Returns the update section cards for the given frontmatter.
 * @param frontmatterByPaths - Frontmatter by paths.
 * @param filterFrontmatterFn - Filter frontmatter function.
 * @returns section cards.
 */
export function processUpdateSectionCards(
  frontmatterByPaths: [string, Frontmatter][],
  filterFrontmatterFn = filterFrontmatter
): UpdateCard[] {
  return [...frontmatterByPaths]
    .map(mapToCardFrontmatter)
    .filter(filterFrontmatterFn)
    .sort(sortFrontmatter)
    .map(mapToSectionCard);
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

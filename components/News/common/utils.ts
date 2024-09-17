import { DATE_FORMAT } from "../../../content/constants";
import { Frontmatter, FrontmatterNews } from "../../../content/entities";
import { getFrontmatterByPaths, getMoment } from "../../../content/utils";
import {
  getDocsDirectory,
  mapSlugByFilePaths,
} from "../../../docs/common/utils";
import { DIR_NAME } from "./constants";

interface ParsedFrontmatter extends Omit<FrontmatterNews, "date"> {
  date: Date;
}

/**
 * Returns true if the frontmatter date is defined, and the frontmatter "hidden" field is false.
 * @param pathFrontmatter - Tuple containing path and frontmatter.
 * @returns true if the frontmatter date is defined, and the frontmatter "hidden" field is false.
 */
function filterFrontmatter(
  pathFrontmatter: [string, FrontmatterNews]
): boolean {
  const [, parsedFrontmatter] = pathFrontmatter;
  return Boolean(parsedFrontmatter.date && !parsedFrontmatter.hidden);
}

/**
 * Returns true if the frontmatter is "news" related.
 * @param pathFrontmatter - Tuple containing path and frontmatter.
 * @returns true if the frontmatter is "news" related.
 */
function filterFrontmatterNews(
  pathFrontmatter: [string, Frontmatter]
): pathFrontmatter is [string, FrontmatterNews] {
  const [, frontmatter] = pathFrontmatter;
  return "date" in frontmatter;
}

/**
 * Returns tuple path parsed frontmatter.
 * Frontmatter date value parsed as "Date" for "news" related frontmatter.
 * @param pathFrontmatter - Tuple containing path and associated frontmatter.
 * @returns tuple containing path and parsed frontmatter.
 */
function parseFrontmatter(
  pathFrontmatter: [string, FrontmatterNews]
): [string, ParsedFrontmatter] {
  const [path, frontmatter] = pathFrontmatter;
  const moment = getMoment(frontmatter.date);
  const date = moment.toDate();
  return [path, { ...frontmatter, date }];
}

/**
 * Returns the processed frontmatter for "news" related frontmatter.
 * @param pathRawOrParsedFrontmatter - Tuple containing path and raw or parsed frontmatter.
 * @returns processed frontmatter.
 */
export function processFrontmatter(
  pathRawOrParsedFrontmatter: [string, Frontmatter | ParsedFrontmatter]
): FrontmatterNews {
  const [path, frontmatter] = pathRawOrParsedFrontmatter;
  return {
    ...frontmatter,
    date: processFrontmatterDate(frontmatter),
    url: processFrontmatterURL(path),
  };
}

/**
 * Formats the date as a string.
 * @param frontmatter - Frontmatter (raw or parsed).
 * @returns date as a string.
 */
function processFrontmatterDate(
  frontmatter: Frontmatter | ParsedFrontmatter
): FrontmatterNews["date"] {
  if ("date" in frontmatter) {
    return getMoment(frontmatter.date).format(DATE_FORMAT);
  }
  return "";
}

/**
 * Returns the URL for the given path.
 * @param path - Path.
 * @returns URL for the given path.
 */
function processFrontmatterURL(path?: string): string | null {
  if (!path) return null;
  return `/${path}`;
}

/**
 * Returns parsed and filtered frontmatter for each news article.
 * @returns frontmatter for each news article.
 */
export function processNewsFrontmatter(): FrontmatterNews[] {
  const slugByFilePaths = mapSlugByFilePaths(
    `${getDocsDirectory()}/${DIR_NAME}`
  );
  const frontmatterByPaths = getFrontmatterByPaths(slugByFilePaths, DIR_NAME);
  return [...frontmatterByPaths]
    .filter(filterFrontmatterNews)
    .filter(filterFrontmatter)
    .map(parseFrontmatter)
    .sort(sortFrontmatter)
    .map(processFrontmatter);
}

/**
 * Sorts the path parsed frontmatter tuple by date.
 * @param t0 - First tuple to compare.
 * @param t1 - Second tuple to compare.
 * @returns number indicating sort precedence of t0 vs t1.
 */
function sortFrontmatter(
  t0: [string, ParsedFrontmatter],
  t1: [string, ParsedFrontmatter]
): number {
  const [, f0] = t0;
  const [, f1] = t1;
  return f0.date > f1.date ? -1 : 1;
}

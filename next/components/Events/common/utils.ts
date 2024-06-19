import { Frontmatter, FrontmatterEvent } from "../../../content/entities";
import {
  buildMomentField,
  getFrontmatterByPaths,
  getMoment,
} from "../../../content/utils";
import {
  getDocsDirectory,
  mapSlugByFilePaths,
} from "../../../docs/common/utils";
import { DATE_FORMAT, DIR_NAME } from "./constants";

interface ParsedFrontmatter extends Omit<FrontmatterEvent, "date"> {
  date: Date;
}

/**
 * Returns true if the frontmatter session is defined, and the frontmatter "hidden" field is false.
 * @param pathFrontmatter - Tuple containing path and frontmatter.
 * @returns true if the frontmatter session is defined, and the frontmatter "hidden" field is false.
 */
function filterFrontmatter(
  pathFrontmatter: [string, FrontmatterEvent]
): boolean {
  const [, parsedFrontmatter] = pathFrontmatter;
  return Boolean(parsedFrontmatter.sessions && !parsedFrontmatter.hidden);
}

/**
 * Returns true if the frontmatter is "event" related.
 * @param pathFrontmatter - Tuple containing path and frontmatter.
 * @returns true if the frontmatter is "event" related.
 */
function filterFrontmatterEvents(
  pathFrontmatter: [string, Frontmatter]
): pathFrontmatter is [string, FrontmatterEvent] {
  const [, frontmatter] = pathFrontmatter;
  return "sessions" in frontmatter || "eventType" in frontmatter;
}

/**
 * Returns tuple path parsed frontmatter.
 * Frontmatter session (first session) value parsed as "Date" for "event" related frontmatter.
 * @param pathFrontmatter - Tuple containing path and associated frontmatter.
 * @returns tuple containing path and parsed frontmatter.
 */
function parseFrontmatter(
  pathFrontmatter: [string, FrontmatterEvent]
): [string, ParsedFrontmatter] {
  const [path, frontmatter] = pathFrontmatter;
  const moment = buildMomentField(frontmatter);
  const date = moment?.toDate() || new Date();
  return [path, { ...frontmatter, date }];
}

/**
 * Returns the processed frontmatter for "event" related frontmatter.
 * @param pathRawOrParsedFrontmatter - Tuple containing path and raw or parsed frontmatter.
 * @returns processed frontmatter.
 */
export function processFrontmatter(
  pathRawOrParsedFrontmatter: [string, FrontmatterEvent | ParsedFrontmatter]
): FrontmatterEvent {
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
): FrontmatterEvent["date"] {
  if ("date" in frontmatter && frontmatter.date instanceof Date) {
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
 * Returns parsed and filtered frontmatter for each event article.
 * @returns frontmatter for each article.
 */
export function processEventsFrontmatter(): FrontmatterEvent[] {
  const slugByFilePaths = mapSlugByFilePaths(
    `${getDocsDirectory()}/${DIR_NAME}`
  );
  const frontmatterByPaths = getFrontmatterByPaths(slugByFilePaths, DIR_NAME);
  return [...frontmatterByPaths]
    .filter(filterFrontmatterEvents)
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

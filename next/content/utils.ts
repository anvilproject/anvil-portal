import fs from "fs";
import matter from "gray-matter";
import { Moment, tz } from "moment-timezone";
import "moment-timezone/index";
import { default as path, default as pathTool } from "path";
import { SlugByFilePaths } from "../docs/common/entities";
import {
  EventSession,
  Frontmatter,
  FrontmatterEvent,
  FrontmatterNews,
} from "./entities";

const DOC_FOLDER_NAME = "content";

/**
 * Returns the start date, taken from the earliest "session" date from "event" related frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns event date.
 */
export function buildEventDateField(
  frontmatter: Frontmatter
): Date | undefined {
  if (isFrontmatterEvent(frontmatter)) {
    const { sessions, timezone } = frontmatter || {};
    /* Grab a set of moments. */
    const setOfMoments = getSetOfMoments(sessions, timezone);
    /* Grab the first moment. */
    const firstMoment = getFirstMoment(setOfMoments);
    /* Return formatted first date. */
    return firstMoment?.toDate();
  }
}

/**
 * Returns the date, taken from the "date" field from "news" related frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns news date.
 */
export function buildNewsDateField(frontmatter: Frontmatter): Date | undefined {
  if (isFrontmatterNews(frontmatter)) {
    const { date } = frontmatter || {};
    return new Date(date);
  }
}

/**
 * Converts a date value to a moment object.
 * @param date - Date.
 * @param timezone - Timezone.
 * @returns moment object.
 */
function convertDateToMoment(date: string, timezone: string): Moment {
  return tz(date, ["D MMM YYYY h:mm A", "D MMM YYYY"], timezone);
}

/**
 * Returns a formatted date.
 * @param date - Date.
 * @returns formatted date.
 */
export function formatDate(date?: Date): string | undefined {
  return date?.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Returns the path to the given content directory e.g. "...content/events" or "...content/news".
 * @param dirName - Directory name.
 * @returns path to the content directory.
 */
export function getContentDirectory(dirName: string): string {
  return pathTool.join(path.dirname(process.cwd()), DOC_FOLDER_NAME, dirName);
}

/**
 * Returns the file path to the given content file and directory.
 * @param dirName - Directory name.
 * @param fileName - File name.
 * @returns file path to the content file.
 */
export function getFilePath(dirName: string, fileName: string): string {
  return pathTool.join(dirName, fileName);
}

/**
 * Returns the earliest moment object.
 * @param setOfMoments - Set of moments.
 * @returns first moment object.
 */
function getFirstMoment(setOfMoments: Set<Moment>): Moment | undefined {
  /* Sort the moments ASC. */
  const sortedMoments = [...setOfMoments].sort((moment01, moment02) =>
    moment01.diff(moment02)
  );
  /* Return the first moment. */
  return sortedMoments.shift();
}

/**
 * Returns map of frontmatter by path (generated from the slug and directory name if defined).
 * @param slugByFilePaths - Map of slugs by file paths.
 * @param dirName - Directory name (optional).
 * @returns map of frontmatter by path.
 */
export function getFrontmatterByPaths(
  slugByFilePaths: SlugByFilePaths,
  dirName?: string
): Map<string, Frontmatter> {
  const frontmatterByPath: Map<string, Frontmatter> = new Map();
  for (const [filePath, slug] of [...slugByFilePaths]) {
    const { data: frontmatter } = getMatter(filePath);
    if (dirName) {
      slug.unshift(dirName);
    }
    const path = slug.join("/");
    if (path) {
      frontmatterByPath.set(path, frontmatter as Frontmatter);
    }
  }
  return frontmatterByPath;
}

/**
 * Returns matter object (frontmatter and content) from the given MDX path.
 * @param filePath - File path of MD / MDX file.
 * @returns matter object.
 */
export function getMatter(filePath: string): matter.GrayMatterFile<string> {
  const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
  return matter(markdownWithMeta);
}

/**
 * Returns a set of moments from the given sessions.
 * @param sessions - Sessions.
 * @param timezone - Timezone.
 * @returns set of moments.
 */
function getSetOfMoments(
  sessions: EventSession[],
  timezone: string
): Set<Moment> {
  const setOfMoments = new Set<Moment>();
  sessions.forEach((session) => {
    Object.values(session).forEach((date) => {
      const moment = convertDateToMoment(date, timezone);
      setOfMoments.add(moment);
    });
  });
  return setOfMoments;
}

/**
 * Returns true if the featured field is defined, and true.
 * @param frontmatter - Frontmatter.
 * @returns true if the featured field is defined, and true.
 */
export function isFeatured(frontmatter: Frontmatter): boolean | undefined {
  return "featured" in frontmatter && frontmatter.featured;
}

/**
 * Determine if the given frontmatter is related to "event" content.
 * @param frontmatter - Frontmatter.
 * @returns true if the frontmatter is related to "event" content.
 */
export function isFrontmatterEvent(
  frontmatter: Frontmatter
): frontmatter is FrontmatterEvent {
  return "sessions" in frontmatter;
}

/**
 * Determine if the given frontmatter is related to "news" content.
 * @param frontmatter - Frontmatter.
 * @returns true if the frontmatter is related to "news" content.
 */
export function isFrontmatterNews(
  frontmatter: Frontmatter
): frontmatter is FrontmatterNews {
  return "date" in frontmatter;
}

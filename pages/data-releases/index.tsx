import { GetStaticProps } from "next";
import { StaticProps } from "../../content/entities";
import { StyledMain } from "../../components/Layout/components/Main/main.styles";
import { ReleasesView } from "../../views/ReleasesView/releasesView";
import { FRONTMATTER } from "../../views/ReleasesView/frontmatter";
import { Release } from "../../views/ReleasesView/types";
import { resolveRelativeDirs } from "../../docs/common/resolveRelativeDirs";
import { mapSlugByFilePaths } from "../../docs/common/utils";
import { format, formatDistanceToNowStrict, compareDesc } from "date-fns";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/types";
import slugify from "slugify";

const DOCS_DIR = "docs";
const DATA_RELEASES_DIR = "data-releases";

export interface PageProps
  extends Omit<StaticProps, "layoutStyle" | "mdxSource"> {
  releases: Release[];
}

const Page = (props: PageProps): JSX.Element => {
  return <ReleasesView {...props} />;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const dateByPaths = getDatePathMap(getDataReleaseSlugs());
  const dates = getReleaseDates(dateByPaths);
  const outline = buildOutline(dates);
  const releases = buildReleases(dates, dateByPaths);
  return {
    props: {
      frontmatter: FRONTMATTER,
      outline,
      pageTitle: "Releases",
      releases,
      slug: [DATA_RELEASES_DIR],
    },
  };
};

Page.Main = StyledMain;

export default Page;

/**
 * Returns the outline.
 * @param dates - Release dates.
 * @returns outline.
 */
function buildOutline(dates: Date[]): OutlineItem[] {
  return dates.map((date) => ({
    depth: 1,
    hash: getReleaseId(date),
    value: format(date, "MMMM yyyy"),
  }));
}

/**
 * Returns the releases.
 * @param dates - Release dates.
 * @param dateByPaths - Date to path map.
 * @returns releases.
 */
function buildReleases(
  dates: Date[],
  dateByPaths: Map<Date, string>
): Release[] {
  return dates.map((date) => {
    return {
      id: getReleaseId(date),
      month: format(date, "MMMM"),
      timeSinceRelease: formatDistanceToNowStrict(date),
      url: dateByPaths.get(date) ?? "",
      year: format(date, "yyyy"),
    };
  });
}

/**
 * Returns the date path.
 * @param slug - Release slug.
 * @returns date path.
 */
function getDatePath(slug: string[]): string {
  return `/${DATA_RELEASES_DIR}/${slug.join("/")}`;
}

/**
 * Returns the date to path map.
 * @param slugs - Release slugs.
 * @returns date to path map.
 */
function getDatePathMap(slugs: string[][]): Map<Date, string> {
  return new Map(
    slugs.map((slug) => [mapReleaseDate(slug), getDatePath(slug)])
  );
}

/**
 * Returns the slugs for each data release.
 * @returns slugs for each data release.
 */
function getDataReleaseSlugs(): string[][] {
  return [
    ...mapSlugByFilePaths(
      resolveRelativeDirs([DOCS_DIR, DATA_RELEASES_DIR])
    ).values(),
  ];
}

/**
 * Returns the release dates, sorted in descending order.
 * @param dateByPaths - Date to path map.
 * @returns release dates.
 */
function getReleaseDates(dateByPaths: Map<Date, string>): Date[] {
  return [...dateByPaths.keys()].sort(compareDesc);
}

/**
 * Returns the release date.
 * @param segment - Segment.
 * @param segment.0 - Release year.
 * @param segment.1 - Release month.
 * @returns release date.
 */
function mapReleaseDate([year, month]: string[]): Date {
  return new Date(Number(year), Number(month) - 1);
}

/**
 * Returns the release id.
 * @param date - Release date.
 * @returns release id.
 */
function getReleaseId(date: Date): string {
  return slugify(format(date, "MMMM yyyy"), { lower: true, strict: true });
}

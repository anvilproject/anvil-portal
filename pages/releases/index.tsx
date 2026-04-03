import { GetStaticProps } from "next";
import { JSX } from "react";
import { StaticProps } from "../../content/entities";
import { StyledMain } from "../../components/Layout/components/Main/main.styles";
import { ReleasesView } from "../../views/ReleasesView/releasesView";
import { FRONTMATTER } from "../../views/ReleasesView/frontmatter";
import { Release } from "../../views/ReleasesView/types";
import { resolveRelativeDirs } from "@databiosphere/findable-ui/lib/utils/mdx/files/resolveRelativeDirs";
import {
  compareDesc,
  format,
  formatDistanceToNowStrict,
  isPast,
  parseISO,
} from "date-fns";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/types";
import slugify from "slugify";
import { buildMDXFilePath } from "@databiosphere/findable-ui/lib/utils/mdx/staticGeneration/utils";
import { getMatter } from "@databiosphere/findable-ui/lib/utils/mdx/frontmatter/getMatter";
import { mapMDXSlugByFilePaths } from "@databiosphere/findable-ui/lib/utils/mdx/files/mapMDXSlugByFilePaths";
import { ROUTES } from "../../routes/constants";

const DOCS_DIR = "docs";
const RELEASES_DIR = "releases";

export interface PageProps extends Omit<
  StaticProps,
  "layoutStyle" | "mdxSource"
> {
  releases: Release[];
}

const Page = (props: PageProps): JSX.Element => {
  return <ReleasesView {...props} />;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const slugs = getDataReleaseSlugs();
  const metadata = getReleaseMetadata(slugs);
  const releases = buildReleases(metadata);
  const outline = buildOutline(releases);
  return {
    props: {
      frontmatter: FRONTMATTER,
      outline,
      pageTitle: "Releases",
      releases,
      slug: [RELEASES_DIR],
    },
  };
};

Page.Main = StyledMain;

export default Page;

/**
 * Returns the outline.
 * @param releases - Releases.
 * @returns outline.
 */
function buildOutline(releases: Release[]): OutlineItem[] {
  return releases.map((release) => ({
    depth: 1,
    hash: release.id,
    value: release.title,
  }));
}

interface ReleaseMetadata {
  date: Date;
  slug: string[];
  title: string;
}

/**
 * Returns release metadata from frontmatter for all slugs.
 * @param slugs - Release slugs.
 * @returns release metadata sorted by date descending.
 */
function getReleaseMetadata(slugs: string[][]): ReleaseMetadata[] {
  return slugs
    .map((slug) => {
      const fileName = buildMDXFilePath([DOCS_DIR, RELEASES_DIR], slug);
      const { data } = getMatter(fileName!);
      if (!data.date)
        throw new Error(`Date not found in frontmatter: ${fileName}`);
      const date = parseISO(data.date);
      const title = data.title || `${format(date, "MMMM")} Release`;
      return { date, slug, title };
    })
    .sort((a, b) => compareDesc(a.date, b.date));
}

/**
 * Returns the releases.
 * @param metadata - Release metadata.
 * @returns releases.
 */
function buildReleases(metadata: ReleaseMetadata[]): Release[] {
  return metadata.map(({ date, slug, title }) => ({
    dateLabel: isPast(date)
      ? `${formatDistanceToNowStrict(date)} ago`
      : format(date, "dd/MM/yyyy"),
    id: getReleaseId(date),
    title,
    url: getDatePath(slug),
    year: format(date, "yyyy"),
  }));
}

/**
 * Returns the date path.
 * @param slug - Release slug.
 * @returns date path.
 */
function getDatePath(slug: string[]): string {
  if (!slug.length) return ROUTES.RELEASES;
  return `${ROUTES.RELEASES}/${slug.join("/")}`;
}

/**
 * Returns the slugs for each data release.
 * @returns slugs for each data release.
 */
function getDataReleaseSlugs(): string[][] {
  return [
    ...mapMDXSlugByFilePaths(
      resolveRelativeDirs([DOCS_DIR, RELEASES_DIR])
    ).values(),
  ];
}

/**
 * Returns the release id.
 * @param date - Release date.
 * @returns release id.
 */
function getReleaseId(date: Date): string {
  return slugify(format(date, "MMMM yyyy"), { lower: true, strict: true });
}

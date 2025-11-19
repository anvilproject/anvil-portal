import { StyledMain } from "../../../../components/Layout/components/Main/main.styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPathsResult } from "next/types";
import { ParsedUrlQuery } from "querystring";
import remarkGfm from "remark-gfm";
import { processFrontmatter } from "../../../../components/Releases/common/utils";
import {
  extractMDXFrontmatter,
  generatePaths,
  parseFrontmatter,
} from "../../../../docs/common/utils";
import { rehypeSlug } from "../../../../plugins/rehypeSlug";
import { resolveRelativeDirs } from "docs/common/resolveRelativeDirs";
import { StaticProps } from "../../../../content/entities";
import { StyledContentOverviewView } from "../../../../views/ReleaseNotesView/releaseNotesView.styles";

const DOCS_DIR = "docs";
const DATA_RELEASES_DIR = "data-releases";

interface PageUrlParams extends ParsedUrlQuery {
  month: string;
  slug: string;
  year: string;
}

type PageProps = StaticProps;

export const getStaticProps: GetStaticProps = async (
  props: GetStaticPropsContext
) => {
  const slug = getSlug(props.params as PageUrlParams);
  const { content, data } = extractMDXFrontmatter(slug);
  const rawFrontmatter = parseFrontmatter(data);

  if (!rawFrontmatter || rawFrontmatter.hidden) return { notFound: true };

  const frontmatter = processFrontmatter(rawFrontmatter);

  const mdxSource = await serialize(content, {
    mdxOptions: { rehypePlugins: [rehypeSlug], remarkPlugins: [remarkGfm] },
    scope: { frontmatter },
  });

  return {
    props: {
      frontmatter,
      mdxSource,
      pageTitle: frontmatter.title,
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mapParams(
    generatePaths(resolveRelativeDirs([DOCS_DIR, DATA_RELEASES_DIR]))
  );
  return { fallback: false, paths };
};

const Page = (props: PageProps): JSX.Element => {
  return <StyledContentOverviewView {...props} />;
};

export default Page;

Page.Main = StyledMain;

/**
 * Returns the page slug for the given static props context and section.
 * @param params - Static props context.
 * @returns page slug.
 */
function getSlug(params: PageUrlParams): string[] {
  const { month, slug, year } = params;
  return ["data-releases", year, month, slug];
}

/**
 * Returns true if the slug is an array.
 * @param slug - Slug.
 * @returns true if the slug is an array.
 */
function isSlugArray(slug: string | string[] | undefined): slug is string[] {
  return Array.isArray(slug);
}

/**
 * Maps the paths to the page params.
 * @param paths - Paths.
 * @returns mapped paths.
 */
function mapParams(
  paths: GetStaticPathsResult["paths"]
): GetStaticPathsResult["paths"] {
  return paths.reduce(
    (acc, path) => {
      if (typeof path === "string") return acc;
      const { params } = path;
      if (isSlugArray(params.slug)) {
        const [year, month, slug] = params.slug;
        acc.push({ params: { month, slug, year } });
      }
      return acc;
    },
    [] as GetStaticPathsResult["paths"]
  );
}

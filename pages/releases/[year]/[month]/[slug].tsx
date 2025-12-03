import { StyledMain } from "../../../../components/Layout/components/Main/main.styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { GetStaticPathsResult } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { processFrontmatter } from "../../../../components/Releases/common/utils";
import { buildStaticPaths } from "@databiosphere/findable-ui/lib/utils/mdx/staticGeneration/staticPaths";
import { StaticProps } from "../../../../content/entities";
import { ContentOverviewView } from "../../../../views/ContentOverviewView/contentOverviewView";
import { buildStaticProps } from "@databiosphere/findable-ui/lib/utils/mdx/staticGeneration/staticProps";
import { buildMDXFilePath } from "@databiosphere/findable-ui/lib/utils/mdx/staticGeneration/utils";

const DOCS_DIR = "docs";
const RELEASES_DIR = "releases";

interface PageUrlParams extends ParsedUrlQuery {
  month: string;
  slug: string;
  year: string;
}

type PageProps = StaticProps;

export const getStaticProps: GetStaticProps = async (
  props: GetStaticPropsContext
) => {
  // Build the slug.
  const slug = getSlug(props.params as PageUrlParams);

  // Build the static props for the page.
  const staticProps = await buildStaticProps(
    buildMDXFilePath([DOCS_DIR], slug),
    slug,
    processFrontmatter,
    { mdxOptions: { development: process.env.NODE_ENV !== "production" } }
  );

  // If the static props are not found, return not found.
  if (!staticProps) return { notFound: true };

  return staticProps;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: mapParams(buildStaticPaths([DOCS_DIR, RELEASES_DIR])),
  };
};

const Page = (props: PageProps): JSX.Element => {
  return <ContentOverviewView {...props} />;
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
  return ["releases", year, month, slug];
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

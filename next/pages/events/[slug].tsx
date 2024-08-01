import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPathsResult } from "next/types";
import { ParsedUrlQuery } from "querystring";
import remarkGfm from "remark-gfm";
import { ContentView } from "../../components";
import { processEventFrontmatter } from "../../components/Events/common/utils";
import { Content } from "../../components/Layout/components/Content/content";
import { Frontmatter } from "../../content/entities";
import { isFrontmatterEvent } from "../../content/utils";
import { MDX_COMPONENTS } from "../../docs/common/constants";
import { generatePaths, parseMDXFrontmatter } from "../../docs/common/utils";
import { rehypeSlug } from "../../plugins/rehypeSlug";

interface EventArticlePageUrlParams extends ParsedUrlQuery {
  slug: string;
}

interface EventArticlePageProps {
  mdxSource: MDXRemoteSerializeResult;
  pageTitle: string | null;
}

const EventArticlePage = ({
  mdxSource,
}: EventArticlePageProps): JSX.Element => {
  return (
    <ContentView
      content={
        <Content>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </Content>
      }
      layoutStyle={LAYOUT_STYLE_NO_CONTRAST_DEFAULT}
    />
  );
};

export const getStaticProps: GetStaticProps = async (
  props: GetStaticPropsContext
) => {
  const { content, data } = parseMDXFrontmatter(
    getEventSlug(props.params as EventArticlePageUrlParams)
  );
  const frontmatter = data as Frontmatter;
  if (frontmatter.hidden) {
    return {
      notFound: true,
    };
  }
  if (!isFrontmatterEvent(frontmatter)) {
    return {
      notFound: true,
    };
  }
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm],
    },
    scope: {
      frontmatter: processEventFrontmatter(frontmatter),
    },
  });
  return {
    props: {
      mdxSource,
      pageTitle: frontmatter.title ?? null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getEventArticleStaticPaths(generatePaths());
  return {
    fallback: false,
    paths,
  };
};

export default EventArticlePage;

EventArticlePage.Main = Main;

/**
 * Reduces the paths to only include event articles.
 * @param paths - Paths.
 * @returns event article paths.
 */
function getEventArticleStaticPaths(
  paths: GetStaticPathsResult["paths"]
): GetStaticPathsResult["paths"] {
  return paths.reduce((acc, path) => {
    if (typeof path === "string") return acc;
    const {
      params: { slug },
    } = path;
    if (isSlugArray(slug) && isEventArticle(slug)) {
      acc.push({
        params: {
          slug: slug[1],
        },
      });
    }
    return acc;
  }, [] as GetStaticPathsResult["paths"]);
}

/**
 * Returns the event article path as an array.
 * @param params - Page URL parameters.
 * @returns event article path as an array.
 */
function getEventSlug(params: EventArticlePageUrlParams): string[] {
  const { slug } = params;
  return ["events", slug];
}

/**
 * Returns true if the slug is an event article.
 * @param slug - Slug.
 * @returns true if the slug is an event article.
 */
function isEventArticle(slug: string[]): boolean {
  if (slug[0] !== "events") return false;
  return slug.length !== 1;
}

/**
 * Returns true if the slug is an array.
 * @param slug - Slug.
 * @returns true if the slug is an array.
 */
function isSlugArray(slug: string | string[] | undefined): slug is string[] {
  return Array.isArray(slug);
}

import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPathsResult } from "next/types";
import { ParsedUrlQuery } from "querystring";
import remarkGfm from "remark-gfm";
import { ContentView } from "../../../../../components";
import { ContentEnd } from "../../../../../components/Layout/components/Content/components/ContentEnd/contentEnd";
import { Content } from "../../../../../components/Layout/components/Content/content";
import { processFrontmatter } from "../../../../../components/News/common/utils";
import { Frontmatter } from "../../../../../content/entities";
import { MDX_COMPONENTS } from "../../../../../docs/common/constants";
import {
  generatePaths,
  parseMDXFrontmatter,
} from "../../../../../docs/common/utils";
import { rehypeSlug } from "../../../../../plugins/rehypeSlug";

interface NewsArticlePageUrlParams extends ParsedUrlQuery {
  date: string;
  month: string;
  slug: string;
  year: string;
}

interface NewsArticlePageProps {
  mdxSource: MDXRemoteSerializeResult;
  pageTitle: string | null;
  slug: string[];
}

const NewsArticlePage = ({
  mdxSource,
  slug,
}: NewsArticlePageProps): JSX.Element => {
  return (
    <ContentView
      content={
        <Content>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
          <ContentEnd slug={slug} />
        </Content>
      }
      layoutStyle={LAYOUT_STYLE_NO_CONTRAST_DEFAULT}
    />
  );
};

export const getStaticProps: GetStaticProps = async (
  props: GetStaticPropsContext
) => {
  const slug = getNewsSlug(props.params as NewsArticlePageUrlParams);
  const { content, data } = parseMDXFrontmatter(slug);
  const frontmatter = data as Frontmatter;
  if (frontmatter.hidden) {
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
      frontmatter: processFrontmatter(["", frontmatter]),
    },
  });
  return {
    props: {
      mdxSource,
      pageTitle: frontmatter.title ?? null,
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getNewsArticleStaticPaths(generatePaths());
  return {
    fallback: false,
    paths,
  };
};

export default NewsArticlePage;

NewsArticlePage.Main = Main;

/**
 * Reduces the paths to only include news articles.
 * @param paths - Paths.
 * @returns news article paths.
 */
function getNewsArticleStaticPaths(
  paths: GetStaticPathsResult["paths"]
): GetStaticPathsResult["paths"] {
  return paths.reduce(
    (acc, path) => {
      if (typeof path === "string") return acc;
      const {
        params: { slug },
      } = path;
      if (isSlugArray(slug) && isNewsArticle(slug)) {
        acc.push({
          params: {
            date: slug[3],
            month: slug[2],
            slug: slug[4],
            year: slug[1],
          },
        });
      }
      return acc;
    },
    [] as GetStaticPathsResult["paths"]
  );
}

/**
 * Returns the news article path as an array.
 * @param params - Page URL parameters.
 * @returns news article path as an array.
 */
function getNewsSlug(params: NewsArticlePageUrlParams): string[] {
  const { date, month, slug, year } = params;
  return ["news", year, month, date, slug];
}

/**
 * Returns true if the slug is a news article.
 * @param slug - Slug.
 * @returns true if the slug is a news article.
 */
function isNewsArticle(slug: string[]): boolean {
  if (slug[0] !== "news") return false;
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

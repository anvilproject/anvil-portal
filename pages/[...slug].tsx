import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { ContentsTab } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/components/ContentsTab/contentsTab";
import { Outline } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/types";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPathsResult } from "next/types";
import Error from "next/error";
import remarkGfm from "remark-gfm";
import { ContentView, Nav, NavBarHero } from "../components";
import { ContentEnd } from "../components/Layout/components/Content/components/ContentEnd/contentEnd";
import { Content } from "../components/Layout/components/Content/content";
import { MDX_COMPONENTS, MDX_SCOPE } from "../docs/common/constants";
import { NodeHero } from "../docs/common/entities";
import {
  extractMDXFrontmatter,
  filterOutline,
  generatePaths,
  getNavigationConfig,
  getStaticPropLayoutStyle,
  parseFrontmatter,
} from "../docs/common/utils";
import { rehypeSlug } from "../plugins/rehypeSlug";
import { remarkHeadings } from "../plugins/remarkHeadings";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";

const CONFLICTING_STATIC_PATHS = ["events", "learn", "news", "data-releases"];

interface DocPageProps {
  hero: NodeHero | null;
  layoutStyle: LayoutStyle;
  mdxSource: MDXRemoteSerializeResult;
  navigation: NavItem[] | null;
  outline: OutlineItem[];
  pageTitle: string | null;
  slug?: string[];
}

const Page = ({
  hero,
  layoutStyle,
  mdxSource,
  navigation,
  outline,
  slug,
}: DocPageProps): JSX.Element => {
  const isGREGoREnabled = useFeatureFlag("gregor");
  const isPRIMEDEnabled = useFeatureFlag("primed");

  if (!isGREGoREnabled && isConsortiumPage("gregor", slug)) {
    // If the page is for the GREGoR consortium and the feature is disabled, return a 404.
    return <Error statusCode={404} />;
  }

  if (!isPRIMEDEnabled && isConsortiumPage("primed", slug)) {
    // If the page is for the PRIMED consortium and the feature is disabled, return a 404.
    return <Error statusCode={404} />;
  }

  if (!mdxSource) return <></>;

  return (
    <ContentView
      content={
        <Content>
          <MDXRemote
            {...mdxSource}
            components={MDX_COMPONENTS}
            scope={{ ...mdxSource.scope, isGREGoREnabled, isPRIMEDEnabled }}
          />
          <ContentEnd slug={slug} />
        </Content>
      }
      layoutStyle={layoutStyle ?? undefined}
      outline={renderOutline(outline)}
      navigation={renderNavigation(navigation, hero)}
    />
  );
};

export const getStaticProps: GetStaticProps = async (
  props: GetStaticPropsContext
) => {
  const slug = props.params?.slug as string[];
  const navigationConfig = getNavigationConfig(slug);
  const {
    hero = null,
    layoutStyle = null,
    navigation = null,
  } = navigationConfig || {};
  const { content, data } = extractMDXFrontmatter(slug);
  const frontmatter = parseFrontmatter(data);
  if (!frontmatter || frontmatter.hidden) return { notFound: true };
  const outline: OutlineItem[] = [];
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [[remarkHeadings, outline], remarkGfm],
    },
    scope: {
      ...MDX_SCOPE,
      frontmatter,
    },
  });
  return {
    props: {
      hero,
      layoutStyle: getStaticPropLayoutStyle(layoutStyle, frontmatter),
      mdxSource,
      navigation,
      outline: frontmatter.enableOutline ? outline.filter(filterOutline) : [],
      pageTitle: frontmatter.title ?? null,
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = generatePaths();
  return {
    fallback: false,
    paths: filterPaths(paths),
  };
};

export default Page;

Page.Main = Main;

/**
 * Checks if the slug is for the consortium page(s).
 * @param path - Path.
 * @param slug - Slug.
 * @returns True if the slug is for the consortium page(s), false otherwise.
 */
function isConsortiumPage(path: string, slug?: string[]): boolean {
  if (!slug) return false;
  return slug.length >= 2 && slug[0] === "consortia" && slug[1] === path;
}

/**
 * Filters conflicting paths with other page static paths.
 * @param paths - Static paths.
 * @returns static paths.
 */
function filterPaths(
  paths: GetStaticPathsResult["paths"]
): GetStaticPathsResult["paths"] {
  return paths.filter((path) => {
    if (typeof path === "string") return false;
    const slug = path.params.slug;
    if (!slug || typeof slug === "string") return false;
    const dirPath = slug[0];
    return !CONFLICTING_STATIC_PATHS.includes(dirPath);
  });
}

/**
 * Renders page navigation.
 * @param navigation - Navigation items.
 * @param hero - Navigation hero.
 * @returns navigation.
 */
function renderNavigation(
  navigation: NavItem[] | null,
  hero: NodeHero | null
): JSX.Element | undefined {
  return navigation ? (
    <Nav
      Hero={hero ? <NavBarHero {...hero} /> : undefined}
      navigation={navigation}
    />
  ) : undefined;
}

/**
 * Renders page outline.
 * @param outline - Outline items.
 * @returns outline.
 */
function renderOutline(outline: OutlineItem[]): JSX.Element | undefined {
  return outline.length > 0 ? (
    <Outline outline={outline} Contents={ContentsTab} />
  ) : undefined;
}

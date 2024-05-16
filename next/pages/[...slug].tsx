import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { ContentsTab } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/components/ContentsTab/contentsTab";
import {
  Outline,
  OutlineItem,
} from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ContentView, Nav, NavBarHero } from "../components";
import { Content } from "../components/Layout/components/Content/content";
import { Frontmatter } from "../content/entities";
import { MDX_COMPONENTS, MDX_SCOPE } from "../docs/common/constants";
import { NodeHero } from "../docs/common/entities";
import {
  filterOutline,
  generatePaths,
  getContentLayoutStyle,
  getNavigationConfig,
  parseMDXFrontmatter,
} from "../docs/common/utils";
import { rehypeSlug } from "../plugins/rehypeSlug";
import { remarkHeadings } from "../plugins/remarkHeadings";

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
}: DocPageProps): JSX.Element => {
  if (!mdxSource) return <></>;
  return (
    <ContentView
      content={
        <Content>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
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
  const { content, data } = parseMDXFrontmatter(slug);
  const frontmatter = data as Frontmatter;
  if (frontmatter.hidden) {
    return {
      notFound: true,
    };
  }
  const outline: OutlineItem[] = [];
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [[remarkHeadings, outline]],
    },
    scope: {
      ...MDX_SCOPE,
      frontmatter,
    },
  });
  return {
    props: {
      hero: navigationConfig?.hero ?? null,
      layoutStyle: getContentLayoutStyle(
        navigationConfig?.layoutStyle,
        frontmatter.layoutStyle
      ),
      mdxSource,
      navigation: navigationConfig?.navigation ?? null,
      outline: outline.filter(filterOutline),
      pageTitle: frontmatter.title ?? null,
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = generatePaths();
  return {
    fallback: false,
    paths,
  };
};

export default Page;

Page.Main = Main;

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

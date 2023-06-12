import { LAYOUT_STYLE } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/contentLayout";
import { NavItem } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Nav/nav";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import pathTool from "path";
import { ContentView, Nav, NavBarHero } from "../components";
import { MDX_COMPONENTS, MDX_SCOPE } from "../docs/common/constants";
import { Frontmatter, NodeHero } from "../docs/common/entities";
import {
  generatePaths,
  getDocsDirectory,
  getNavigationConfig,
} from "../docs/common/utils";

interface DocPageProps {
  frontmatter: Frontmatter;
  hero: NodeHero | null;
  mdxSource: MDXRemoteSerializeResult;
  navigation: NavItem[] | null;
  slug?: string[];
}

const Page = ({
  frontmatter,
  hero,
  mdxSource,
  navigation,
}: DocPageProps): JSX.Element => {
  if (!mdxSource) return <></>;
  const { layoutStyle } = frontmatter || {};
  return (
    <ContentView
      content={<MDXRemote {...mdxSource} components={MDX_COMPONENTS} />}
      layoutStyle={layoutStyle ?? LAYOUT_STYLE.CONTRAST}
      navigation={
        navigation ? (
          <Nav
            Hero={hero ? <NavBarHero {...hero} /> : undefined}
            navigation={navigation}
          />
        ) : undefined
      }
    />
  );
};

export const getStaticProps: GetStaticProps = async (
  props: GetStaticPropsContext
) => {
  const slug = props.params?.slug as string[];
  const navigationConfig = getNavigationConfig(slug);
  const markdownWithMeta = fs.readFileSync(
    pathTool.join(getDocsDirectory(), slug?.join("/") + ".mdx"),
    "utf-8"
  );
  const { content, data: frontmatter } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    scope: {
      ...MDX_SCOPE,
    },
    mdxOptions: {
      development: false, // See https://github.com/hashicorp/next-mdx-remote/issues/307#issuecomment-1363415249 and https://github.com/hashicorp/next-mdx-remote/issues/307#issuecomment-1378362096.
      rehypePlugins: [],
      remarkPlugins: [],
    },
  });
  return {
    props: {
      frontmatter,
      hero: navigationConfig?.hero ?? null,
      mdxSource,
      navigation: navigationConfig?.navigation ?? null,
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

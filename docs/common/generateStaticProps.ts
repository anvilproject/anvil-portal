import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { GetStaticPropsContext } from "next";
import { SerializeOptions } from "next-mdx-remote/dist/types";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPropsResult } from "next/types";
import remarkGfm from "remark-gfm";
import { Frontmatter, StaticProps } from "../../content/entities";
import { rehypeSlug } from "../../plugins/rehypeSlug";
import { remarkHeadings } from "../../plugins/remarkHeadings";
import {
  buildPageSlug,
  extractMDXFrontmatter,
  getNavigationConfig,
  getStaticPropLayoutStyle,
  getStaticPropNavigation,
  getStaticPropOutline,
  parseFrontmatter,
} from "./utils";

export async function generateStaticProps(
  props: GetStaticPropsContext,
  section = "",
  frontmatterFn = (
    frontmatter: Frontmatter | undefined
  ): Frontmatter | undefined => frontmatter,
  serializeOptions: SerializeOptions = {}
): Promise<GetStaticPropsResult<StaticProps> | undefined> {
  const slug = buildPageSlug(props, section);
  if (!slug) return;
  // Extract frontmatter and content from the MDX file.
  const { content, data } = extractMDXFrontmatter(slug);
  const frontmatter = frontmatterFn(parseFrontmatter(data));
  if (!frontmatter || frontmatter.hidden) return;
  // Serialize the MDX content.
  const outline: OutlineItem[] = [];
  const mdxSource = await serialize(content, {
    ...serializeOptions,
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [[remarkHeadings, outline], remarkGfm],
    },
    scope: { ...serializeOptions.scope, frontmatter },
  });
  // Get the navigation configuration.
  const {
    hero = null,
    layoutStyle = LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
    navigation = null,
  } = getNavigationConfig(slug) || {};
  const { title: pageTitle = null } = frontmatter;
  return {
    props: {
      frontmatter,
      hero,
      layoutStyle: getStaticPropLayoutStyle(layoutStyle, frontmatter),
      mdxSource,
      navigation: getStaticPropNavigation(navigation, frontmatter),
      outline: getStaticPropOutline(outline, frontmatter),
      pageTitle,
      slug,
    },
  };
}

import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/types";
import { rehypeSlug } from "@databiosphere/findable-ui/lib/utils/mdx/plugins/rehypeSlug";
import { remarkHeadings } from "@databiosphere/findable-ui/lib/utils/mdx/plugins/remarkHeadings";
import { GetStaticPropsContext } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPropsResult } from "next/types";
import remarkGfm from "remark-gfm";
import { Frontmatter, StaticProps } from "../../content/entities";
import {
  buildPageSlug,
  extractMDXFrontmatter,
  getNavigationConfig,
  getStaticPropLayoutStyle,
  getStaticPropNavigation,
  getStaticPropOutline,
  parseFrontmatter,
} from "./utils";

// next-mdx-remote v6 no longer publicly exports SerializeOptions; derive it
// from the serialize signature instead of deep-importing dist/types.
type SerializeOptions = NonNullable<Parameters<typeof serialize>[1]>;

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
    // next-mdx-remote v6 defaults blockJS to true, which strips {expression}
    // interpolation (e.g. scope vars) from MDX. Our content relies on it — set
    // after the spread so a caller cannot override it back to true.
    blockJS: false,
    mdxOptions: {
      development: process.env.NODE_ENV === "development",
      ...serializeOptions.mdxOptions,
      // rehypeSlug + remarkHeadings build the page outline, so they must always
      // run; append them after any caller-supplied plugins rather than letting
      // a caller's mdxOptions silently replace them.
      rehypePlugins: [
        ...(serializeOptions.mdxOptions?.rehypePlugins ?? []),
        rehypeSlug,
      ],
      remarkPlugins: [
        ...(serializeOptions.mdxOptions?.remarkPlugins ?? []),
        [remarkHeadings, { outline }],
        remarkGfm,
      ],
    },
    scope: { ...serializeOptions.scope, frontmatter },
  });
  // Get the navigation configuration.
  const {
    hero = null,
    layoutStyle = LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
    navigation = null,
  } = getNavigationConfig(slug) || {};
  const { description: pageDescription = null, title: pageTitle = null } =
    frontmatter;
  return {
    props: {
      frontmatter,
      hero,
      layoutStyle: getStaticPropLayoutStyle(layoutStyle, frontmatter),
      mdxSource,
      navigation: getStaticPropNavigation(navigation, frontmatter),
      outline: getStaticPropOutline(outline, frontmatter),
      pageDescription,
      pageTitle,
      slug,
    },
  };
}

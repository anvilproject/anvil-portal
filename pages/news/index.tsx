import { LAYOUT_STYLE_NO_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ContentView } from "../../components";
import { Content } from "../../components/Layout/components/Content/content";
import { processNewsFrontmatter } from "../../components/News/common/utils";
import { MDX_COMPONENTS } from "../../docs/common/constants";
import {
  extractMDXFrontmatter,
  parseFrontmatter,
} from "../../docs/common/utils";

const SLUG = ["news"];

interface NewsPageProps {
  mdxSource: MDXRemoteSerializeResult;
  pageTitle: string | null;
}

const NewsPage = ({ mdxSource }: NewsPageProps): JSX.Element => {
  return (
    <ContentView
      content={
        <Content>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </Content>
      }
      layoutStyle={LAYOUT_STYLE_NO_CONTRAST_LIGHTEST}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { content, data } = extractMDXFrontmatter(SLUG);
  const frontmatter = parseFrontmatter(data);
  if (!frontmatter || frontmatter.hidden) return { notFound: true };
  const mdxSource = await serialize(content, {
    scope: {
      news: processNewsFrontmatter(),
    },
  });
  return {
    props: {
      mdxSource,
      pageTitle: frontmatter.title ?? null,
    },
  };
};

export default NewsPage;

NewsPage.Main = Main;

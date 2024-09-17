import { LAYOUT_STYLE_NO_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ContentView } from "../../components";
import { processEventsFrontmatter } from "../../components/Events/common/utils";
import { Content } from "../../components/Layout/components/Content/content";
import { Frontmatter } from "../../content/entities";
import { MDX_COMPONENTS } from "../../docs/common/constants";
import { parseMDXFrontmatter } from "../../docs/common/utils";

const SLUG = ["events"];

interface EventsPageProps {
  mdxSource: MDXRemoteSerializeResult;
  pageTitle: string | null;
}

const EventsPage = ({ mdxSource }: EventsPageProps): JSX.Element => {
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
  const { content, data } = parseMDXFrontmatter(SLUG);
  const frontmatter = data as Frontmatter;
  if (frontmatter.hidden) {
    return {
      notFound: true,
    };
  }
  const mdxSource = await serialize(content, {
    scope: {
      events: processEventsFrontmatter(),
    },
  });
  return {
    props: {
      mdxSource,
      pageTitle: frontmatter.title ?? null,
    },
  };
};

export default EventsPage;

EventsPage.Main = Main;

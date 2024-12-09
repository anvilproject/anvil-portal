import { ContentsTab } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/components/ContentsTab/contentsTab";
import {
  Outline,
  OutlineItem,
} from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { MDXRemote } from "next-mdx-remote";
import { Fragment } from "react";
import { ContentEnd } from "../../components/Layout/components/Content/components/ContentEnd/contentEnd";
import { SupportForum } from "../../components/Layout/components/Content/components/SupportForum/supportForum";
import { Content } from "../../components/Layout/components/Content/content";
import { SectionContent } from "../../components/Layout/components/Section/components/SectionContent/sectionContent";
import { SectionHero } from "../../components/Layout/components/Section/components/SectionHero/sectionHero";
import { StaticProps } from "../../content/entities";
import { MDX_COMPONENTS } from "../../docs/common/constants";

export const ContentOverviewView = (props: StaticProps): JSX.Element => {
  const { mdxSource, outline, ...contentProps } = props;
  return (
    <Fragment>
      <SectionHero {...props} />
      <SectionContent
        content={
          <Content>
            <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
            {renderSupportForum(props)}
            {renderContentEnd(props)}
          </Content>
        }
        outline={renderOutline(outline)}
        {...contentProps}
      />
    </Fragment>
  );
};

/**
 * Renders content end component "contribute" section.
 * @param props - Static Props.
 * @returns content end component.
 */
function renderContentEnd(props: StaticProps): JSX.Element | null {
  if (!props.frontmatter.enableContentEnd) return null;
  return <ContentEnd slug={props.slug} />;
}

/**
 * Renders page outline.
 * @param outline - Outline items.
 * @returns outline.
 */
function renderOutline(
  outline?: OutlineItem[] | null
): JSX.Element | undefined {
  if (!outline) return;
  if (outline.length === 0) return;
  return <Outline outline={outline} Contents={ContentsTab} />;
}

function renderSupportForum(props: StaticProps): JSX.Element | null {
  if (!props.frontmatter.enableSupportForum) return null;
  return <SupportForum />;
}

import { ContentsTab } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/components/ContentsTab/contentsTab";
import { Outline } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { MDXRemote } from "next-mdx-remote";
import { Fragment } from "react";
import { ContentEnd } from "../../components/Layout/components/Content/components/ContentEnd/contentEnd";
import { SupportForum } from "../../components/Layout/components/Content/components/SupportForum/supportForum";
import { Content } from "../../components/Layout/components/Content/content";
import { SectionContent } from "../../components/Layout/components/Section/components/SectionContent/sectionContent";
import { SectionHero } from "../../components/Layout/components/Section/components/SectionHero/sectionHero";
import { MDX_COMPONENTS } from "../../docs/common/constants";
import { Props } from "./types";

export const ContentOverviewView = (props: Props): JSX.Element => {
  const { components = MDX_COMPONENTS, mdxSource, slug } = props;
  return (
    <Fragment>
      <SectionHero {...props} />
      <SectionContent
        content={
          <Content>
            <MDXRemote {...mdxSource} components={components} />
            {renderSupportForum(props)}
            {renderContentEnd(props)}
          </Content>
        }
        outline={renderOutline(props)}
        slug={slug}
      />
    </Fragment>
  );
};

/**
 * Renders content end component "contribute" section.
 * @param props - Static Props.
 * @returns content end component.
 */
function renderContentEnd(props: Props): JSX.Element | null {
  if (!props.frontmatter.enableContentEnd) return null;
  return <ContentEnd slug={props.slug} />;
}

/**
 * Renders page outline component.
 * @param props - Static Props.
 * @returns outline component.
 */
function renderOutline(props: Props): JSX.Element | null {
  if (!props.frontmatter.enableOutline) return null;
  return <Outline outline={props.outline} Contents={ContentsTab} />;
}

/**
 * Renders support forum component.
 * @param props - Static Props.
 * @returns support forum component.
 */
function renderSupportForum(props: Props): JSX.Element | null {
  if (!props.frontmatter.enableSupportForum) return null;
  return <SupportForum />;
}

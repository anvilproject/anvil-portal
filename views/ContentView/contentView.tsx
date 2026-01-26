import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { ContentsTab } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/components/ContentsTab/contentsTab";
import { Outline } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/types";
import { MDXRemote } from "next-mdx-remote";
import { JSX } from "react";
import { Nav, NavBarHero } from "../../components";
import { ContentEnd } from "../../components/Layout/components/Content/components/ContentEnd/contentEnd";
import { Content } from "../../components/Layout/components/Content/content";
import { StaticProps } from "../../content/entities";
import { MDX_COMPONENTS } from "../../docs/common/constants";
import { NodeHero } from "../../docs/common/entities";
import { StyledContentView } from "./contentView.styles";

export const ContentView = ({
  hero,
  layoutStyle,
  mdxSource,
  navigation,
  outline,
  slug,
}: StaticProps): JSX.Element | null => {
  if (!mdxSource) return null;
  return (
    <StyledContentView
      content={
        <Content>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
          <ContentEnd slug={slug} />
        </Content>
      }
      layoutStyle={layoutStyle ?? undefined}
      outline={renderOutline(outline)}
      navigation={renderNavigation(navigation, hero)}
    />
  );
};

/**
 * Renders page navigation.
 * @param navigation - Navigation items.
 * @param hero - Navigation hero.
 * @returns navigation.
 */
function renderNavigation(
  navigation?: NavItem[] | null,
  hero?: NodeHero | null
): JSX.Element | undefined {
  if (!navigation) return;
  return (
    <Nav
      Hero={hero ? <NavBarHero {...hero} /> : undefined}
      navigation={navigation}
    />
  );
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

import { PANEL_BACKGROUND_COLOR } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import {
  ContentLayout,
  Outline,
  Positioner,
} from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/contentLayout.styles";
import { ContentViewProps } from "@databiosphere/findable-ui/lib/views/ContentView/contentView";
import { JSX } from "react";
import { StaticProps } from "../../../../../../content/entities";
import {
  StyledContent,
  StyledContentGrid,
  StyledOutlineGrid,
  StyledSection,
} from "./sectionContent.styles";

/**
 * Renders section content with an optional outline that pins below the header.
 * @param props - Section content props.
 * @param props.content - Content.
 * @param props.outline - Outline.
 * @param props.slug - Page slug, used to remount the outline per page.
 * @returns section content.
 */
export const SectionContent = ({
  content,
  outline,
  slug,
}: Omit<
  StaticProps,
  "frontmatter" | "layoutStyle" | "mdxSource" | "outline" | "pageTitle"
> &
  Pick<ContentViewProps, "content" | "outline">): JSX.Element => {
  return (
    <StyledSection>
      <ContentLayout
        hasNavigation={false}
        panelColor={PANEL_BACKGROUND_COLOR.DEFAULT}
      >
        <StyledContentGrid panelColor={PANEL_BACKGROUND_COLOR.DEFAULT}>
          <StyledContent>{content}</StyledContent>
        </StyledContentGrid>
        {outline && (
          <StyledOutlineGrid
            key={slug.join("")}
            panelColor={PANEL_BACKGROUND_COLOR.DEFAULT}
          >
            <Positioner>
              <Outline>{outline}</Outline>
            </Positioner>
          </StyledOutlineGrid>
        )}
      </ContentLayout>
    </StyledSection>
  );
};

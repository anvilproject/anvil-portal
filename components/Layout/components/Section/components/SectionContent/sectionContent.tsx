import { PANEL_BACKGROUND_COLOR } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import {
  ContentLayout,
  Outline,
} from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/contentLayout.styles";
import { useLayoutState } from "@databiosphere/findable-ui/lib/hooks/useLayoutState";
import { ContentViewProps } from "@databiosphere/findable-ui/lib/views/ContentView/contentView";
import { StaticProps } from "../../../../../../content/entities";
import {
  StyledContent,
  StyledContentGrid,
  StyledOutlineGrid,
  StyledPositioner,
  StyledSection,
} from "./sectionContent.styles";

export const SectionContent = ({
  content,
  outline,
  slug,
}: Omit<StaticProps, "mdxSource" | "outline"> &
  Pick<ContentViewProps, "content" | "outline">): JSX.Element => {
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <StyledSection>
      <ContentLayout
        hasNavigation={false}
        panelColor={PANEL_BACKGROUND_COLOR.DEFAULT}
      >
        <StyledContentGrid
          headerHeight={0}
          panelColor={PANEL_BACKGROUND_COLOR.DEFAULT}
        >
          <StyledContent>{content}</StyledContent>
        </StyledContentGrid>
        {outline && (
          <StyledOutlineGrid
            key={slug.join("")}
            headerHeight={0}
            panelColor={PANEL_BACKGROUND_COLOR.DEFAULT}
          >
            <StyledPositioner headerHeight={headerHeight}>
              <Outline>{outline}</Outline>
            </StyledPositioner>
          </StyledOutlineGrid>
        )}
      </ContentLayout>
    </StyledSection>
  );
};
import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { PANEL_BACKGROUND_COLOR } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { useLayoutState } from "@databiosphere/findable-ui/lib/hooks/useLayoutState";
import { StaticProps } from "../../../../../../content/entities";
import { SectionDivider } from "../../../../../Home/components/Section/section.styles";
import {
  Headline,
  PageTitle,
  SectionLayout,
  StyledSection,
} from "./sectionHero.styles";

export const SectionHero = ({
  frontmatter: { breadcrumbs, title },
}: StaticProps): JSX.Element => {
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <StyledSection headerHeight={headerHeight}>
      <SectionLayout
        hasNavigation={false}
        panelColor={PANEL_BACKGROUND_COLOR.SMOKE_LIGHTEST}
      >
        <Headline>
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          <PageTitle>{title}</PageTitle>
        </Headline>
        <SectionDivider />
      </SectionLayout>
    </StyledSection>
  );
};

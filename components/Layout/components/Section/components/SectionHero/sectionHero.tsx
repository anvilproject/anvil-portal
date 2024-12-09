import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { PANEL_BACKGROUND_COLOR } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { useLayoutState } from "@databiosphere/findable-ui/lib/hooks/useLayoutState";
import { StaticProps } from "../../../../../../content/entities";
import { SectionDivider } from "../../../../../Home/components/Section/section.styles";
import {
  Headline,
  PageSubTitle,
  PageTitle,
  SectionLayout,
  StyledSection,
} from "./sectionHero.styles";
import { BaseComponentProps } from "@databiosphere/findable-ui/lib/components/types";
import { Props } from "./types";

export const SectionHero = ({
  className,
  frontmatter: { breadcrumbs, subTitle, title },
  StyledHeadline = Headline,
}: BaseComponentProps & Props & StaticProps): JSX.Element => {
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <StyledSection className={className} headerHeight={headerHeight}>
      <SectionLayout
        hasNavigation={false}
        panelColor={PANEL_BACKGROUND_COLOR.SMOKE_LIGHTEST}
      >
        <StyledHeadline>
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          <PageTitle>{title}</PageTitle>
          {subTitle && <PageSubTitle>{subTitle}</PageSubTitle>}
        </StyledHeadline>
        <SectionDivider />
      </SectionLayout>
    </StyledSection>
  );
};

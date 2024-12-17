import { StaticProps } from "../../content/entities";
import { Fragment } from "react";
import { SupportForum } from "../../components/Layout/components/Content/components/SupportForum/supportForum";
import { Grid, StyledHeadline } from "./learnView.styles";
import { SectionHero } from "../../components/Layout/components/Section/components/SectionHero/sectionHero";
import {
  SectionLayout,
  StyledSection,
} from "../../components/Layout/components/Section/section.styles";
import { CTACard } from "../../components/common/Card/components/CTACard/ctaCard";
import { CARDS } from "./constants";

export const LearnView = (props: StaticProps): JSX.Element => {
  return (
    <Fragment>
      <SectionHero StyledHeadline={StyledHeadline} {...props} />
      <StyledSection>
        <SectionLayout>
          <Grid>
            {CARDS.map((card, index) => (
              <CTACard key={index} {...card} />
            ))}
          </Grid>
          <SupportForum />
        </SectionLayout>
      </StyledSection>
    </Fragment>
  );
};

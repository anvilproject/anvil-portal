import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { smokeLightest } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";
import {
  SectionHeadline as DefaultHeadline,
  SectionLayout as DefaultLayout,
  Section as DefaultSection,
  sectionGrid,
} from "../../section.styles";

export const Section = styled(DefaultSection)`
  background-color: ${smokeLightest};
`;

export const SectionLayout = styled(DefaultLayout)`
  ${sectionGrid};
  gap: 48px 16px;
  padding: 64px 16px;
`;

export const Headline = styled(DefaultHeadline)`
  grid-column: 1 / -1;
  text-align: center;

  ${mediaTabletUp} {
    grid-column: 4 / span 6;
  }
`;

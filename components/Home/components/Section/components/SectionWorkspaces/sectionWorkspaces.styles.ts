import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import {
  SectionHeadline as DefaultHeadline,
  SectionLayout as DefaultLayout,
  sectionGrid,
} from "../../section.styles";

export const SectionLayout = styled(DefaultLayout)`
  ${sectionGrid};
  gap: 48px 16px;
`;

export const Headline = styled(DefaultHeadline)`
  grid-column: 1 / -1;
  justify-items: flex-start;
  max-width: 504px;

  ${mediaTabletUp} {
    grid-column: 1 / 6;
    max-width: unset;
  }
`;

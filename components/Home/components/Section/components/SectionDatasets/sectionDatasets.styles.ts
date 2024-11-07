import styled from "@emotion/styled";
import { mediaTabletLargeUp } from "../../../../../../styles/common/mixins/breakpoints";
import {
  SectionActions as DefaultActions,
  SectionHeadline as DefaultHeadline,
  SectionTitle as DefaultTitle,
  sectionGrid,
} from "../../section.styles";

export const Headline = styled(DefaultHeadline)`
  gap: 24px;

  ${mediaTabletLargeUp} {
    ${sectionGrid};
  }
`;

export const SectionTitle = styled(DefaultTitle)`
  max-width: 504px;

  ${mediaTabletLargeUp} {
    grid-column: 1 / 6;
    max-width: unset;
  }
`;

export const SectionActions = styled(DefaultActions)`
  justify-content: center;
`;

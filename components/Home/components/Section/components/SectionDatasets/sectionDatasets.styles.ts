import styled from "@emotion/styled";
import { mediaTabletLargeUp } from "../../../../../../styles/common/mixins/breakpoints";
import {
  sectionGrid,
  SectionHeadline as DefaultHeadline,
  SectionTitle as DefaultTitle,
} from "../../section.styles";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";

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

export const SectionActions = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  ${mediaTabletUp} {
    grid-template-columns: repeat(12, 1fr);

    .MuiButton-root {
      &:first-of-type {
        grid-column: 1 / 7;
        justify-self: flex-end;
      }

      &:last-of-type {
        grid-column: 7 / 12;
        justify-self: flex-start;
      }
    }
  }
`;

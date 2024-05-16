import { mediaTabletDown } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Grid as DefaultGrid } from "../../../../../Card/card.styles";

export const MIN_DATASET_CARDS = 7; // Displays a minimum of six cards.

interface Props {
  isExpanded: boolean;
}

export const Grid = styled(DefaultGrid)<Props>`
  margin: 48px 0 32px;

  .MuiButton-textPrimary {
    display: none;
    grid-column: 1 / -1;
    justify-self: flex-start;
  }

  ${mediaTabletDown} {
    .MuiCard-root:nth-of-type(n + ${MIN_DATASET_CARDS}) {
      display: ${({ isExpanded }) => (isExpanded ? "flex" : "none")};
    }

    .MuiButton-textPrimary {
      display: flex;
    }
  }
`;

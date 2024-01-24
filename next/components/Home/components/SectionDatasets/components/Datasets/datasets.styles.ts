import { mediaTabletDown } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const MIN_DATASET_CARDS = 7; // Displays a minimum of six cards.

interface Props {
  isExpanded: boolean;
}

export const Datasets = styled("div")<Props>`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, 1fr);
  margin: 48px 0 32px;

  .MuiButton-textPrimary {
    align-self: flex-start;
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

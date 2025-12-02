import { bpDownMd } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Container } from "@mui/material";
import { Props } from "./types";

const CONTENT_WIDTH = 756;
const NAVIGATION_WIDTH = 280;
const OUTLINE_WIDTH = 280;
const PADDING = 40;

const MARGIN = NAVIGATION_WIDTH + CONTENT_WIDTH + OUTLINE_WIDTH;

export const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) =>
    prop !== "extendIntoGutter" && prop !== "gridTemplateColumns",
})<Props>`
  .MuiTableContainer-root {
    ${({ extendIntoGutter }) =>
      extendIntoGutter &&
      css`
        width: min(
          calc(100vw - 32px),
          calc((100vw + ${MARGIN}px) / 2 - ${NAVIGATION_WIDTH}px - ${PADDING}px)
        );
      `}
  }

  .MuiTable-root {
    display: grid;
    grid-template-columns: ${(props) => props.gridTemplateColumns || "1fr"};

    tbody,
    thead,
    tr {
      display: grid;
      gap: inherit;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
    }

    th {
      align-items: center;
      display: flex;
    }

    td {
      overflow-wrap: break-word;
    }
  }

  ${bpDownMd} {
    .MuiTableContainer-root {
      width: 100%;
    }
  }
`;

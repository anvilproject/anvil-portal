import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Grid as DefaultGrid } from "../../../../../Card/card.styles";

interface Props {
  interactionEnabled: boolean;
}

export const Grid = styled(DefaultGrid)<Props>`
  grid-template-columns: repeat(12, 88px);

  ${({ interactionEnabled }) =>
    interactionEnabled &&
    css`
      cursor: grab;
      user-select: none;

      &:active {
        cursor: grabbing;
      }
    `}
`;

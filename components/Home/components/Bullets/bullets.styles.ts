import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

interface Props {
  isActive: boolean;
}

export const Bullets = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const Bullet = styled(ButtonBase, {
  shouldForwardProp: (props) => props !== "isActive",
})<Props>`
  background-color: ${PALETTE.SMOKE_MAIN};
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  height: 6px;
  width: 6px;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${PALETTE.PRIMARY_MAIN};
    `}
`;

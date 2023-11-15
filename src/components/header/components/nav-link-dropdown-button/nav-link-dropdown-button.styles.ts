import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button as MButton } from "@mui/material";

interface Props {
  isActive: boolean;
}

export const NavLinkDropdownButton = styled(MButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<Props>`
  background-color: ${({ theme }) => theme.palette.common.white};
  color: inherit;
  gap: 0;

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.light};
  }

  // Button is "active" i.e. menu is open.
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.palette.smoke.light};
    `};

  .MuiButton-endIcon {
    margin-left: -3px;
    margin-right: -6px;
  }
`;

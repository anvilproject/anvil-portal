import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { ButtonProps as MButtonProps } from "@mui/material";
import React from "react";
import { NavLinkDropdownButton as Button } from "./nav-link-dropdown-button.styles";

export interface NavLinkDropdownButtonProps extends MButtonProps {
  isActive: boolean;
}

export const NavLinkDropdownButton = ({
  children,
  isActive,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: NavLinkDropdownButtonProps): JSX.Element => {
  return (
    <Button
      endIcon={<ArrowDropDownRoundedIcon />}
      isActive={isActive}
      sx={{ justifyContent: { desktop: "unset", mobile: "flex-start" } }}
      variant="nav"
      {...props}
    >
      {children}
    </Button>
  );
};

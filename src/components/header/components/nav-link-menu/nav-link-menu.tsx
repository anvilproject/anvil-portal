import { ListItemText, MenuItem as MMenuItem } from "@mui/material";
import { navigate } from "gatsby";
import React, { MouseEvent, ReactNode, useState } from "react";
import { Target } from "../../../target/target.model";
import { MenuItem } from "../../common/entities";
import { isClientSideNavigation } from "../../common/utils";
import { NavLinkDropdownButton } from "../nav-link-dropdown-button/nav-link-dropdown-button";
import { NavLinkMenu as Menu } from "./nav-link-menu.styles";

export interface NavLinkMenuProps {
  menuItems: MenuItem[];
  menuLabel: ReactNode;
}

export const NavLinkMenu = ({
  menuItems,
  menuLabel,
}: NavLinkMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const onOpenMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <NavLinkDropdownButton isActive={open} onClick={onOpenMenu}>
        {menuLabel}
      </NavLinkDropdownButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoFocus={false}
        onClose={onCloseMenu}
        open={open}
        PaperProps={{ variant: "menu" }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
      >
        {menuItems.map(
          ({ description, label, target = Target.SELF, url }, i) => (
            <MMenuItem
              key={i}
              onClick={(): void => {
                setAnchorEl(null);
                if (isClientSideNavigation(url)) {
                  navigate(url);
                } else {
                  window.open(url, target);
                }
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  variant: description ? "text-body-500" : "text-body-400",
                }}
                secondary={description}
                secondaryTypographyProps={{
                  variant: "text-body-small-400-2lines",
                }}
              />
            </MMenuItem>
          )
        )}
      </Menu>
    </>
  );
};

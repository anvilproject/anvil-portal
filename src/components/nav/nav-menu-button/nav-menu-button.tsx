/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav menu button component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Button from "../../button/button";
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import Icon from "../../icon/icon";

// Styles
import compStyles from "./nav-menu-button.module.css";

function NavMenuButton() {
  const { navMenuOpen, showNavMenuButton, onSetNavMenuOpen } = useContext(
    ContextAnVILPortal
  );
  const icon = navMenuOpen ? "close" : "menu_open";
  return showNavMenuButton ? (
    <div className={compStyles.navMenuButton}>
      <Button clickAction={() => onSetNavMenuOpen(!navMenuOpen)} icon>
        <Icon fontSize={24} showHover={false} showIcon>
          {icon}
        </Icon>
      </Button>
    </div>
  ) : null;
}

export default NavMenuButton;

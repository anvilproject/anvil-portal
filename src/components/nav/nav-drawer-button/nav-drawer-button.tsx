/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav drawer button component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Button from "../../button/button";
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import Icon from "../../icon/icon";

// Styles
import * as compStyles from "./nav-drawer-button.module.css";

function NavDrawerButton(): JSX.Element | null {
  const { navDrawerOpen, onSetNavDrawerOpen, showNavDrawerButton } =
    useContext(ContextAnVILPortal);
  return showNavDrawerButton ? (
    <div className={compStyles.navDrawerButton}>
      <Button clickAction={() => onSetNavDrawerOpen(!navDrawerOpen)}>
        <Icon fontSize={24} showHover={false} showIcon>
          more_vert
        </Icon>
      </Button>
    </div>
  ) : null;
}

export default NavDrawerButton;

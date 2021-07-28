/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header menu button component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Button from "../../button/button";
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import Icon from "../../icon/icon";

// Styles
import compStyles from "./header-menu-button.module.css";

function HeaderMenuButton(): JSX.Element {
  const { menuOpen, onSetMenuOpen } = useContext(ContextAnVILPortal);

  return (
    <div className={compStyles.menu}>
      <Button clickAction={() => onSetMenuOpen(!menuOpen)}>
        <Icon fontSize={32} showHover={false} showIcon>
          menu
        </Icon>
      </Button>
    </div>
  );
}

export default HeaderMenuButton;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header menu button component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Button from "../../button/button";
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import Icon from "../../icon/icon";

function HeaderMenuButton() {

    const {menuOpen, onSetMenuOpen} = useContext(ContextAnVILPortal);
    const menuIcon = menuOpen ? "close" : "menu";

    return (
        <Button clickAction={() => onSetMenuOpen(!menuOpen)} icon>
            <Icon blueDark showHover={false} showIcon={true}>{menuIcon}</Icon>
        </Button>
    );
}

export default HeaderMenuButton;

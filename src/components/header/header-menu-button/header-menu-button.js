/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header menu button component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";

function HeaderMenuButton(props) {

    const {menuOpen, setMenuOpen} = props;
    const menuIcon = menuOpen ? "close" : "menu";

    return (
        <Button clickAction={() => setMenuOpen(menuOpen => !menuOpen)} icon>
            <Icon blueDark showHover={false} showIcon={true}>{menuIcon}</Icon>
        </Button>
    );
}

export default HeaderMenuButton;

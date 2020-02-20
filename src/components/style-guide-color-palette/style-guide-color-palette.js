/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide color palette component.
 * Used by the markdown page "/anvil-style-guide/color-palette".
 * Use the closed tag syntax <style-guide-color-palette></style-guide-color-palette>.
 */

// Core dependencies
import React from "react";

// App dependencies
import {ColorPaletteStaticQuery} from "../../hooks/colorPaletteQuery";
import Hero from "../hero/hero";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./style-guide-color-palette.module.css";

let classNames = require("classnames");

class StyleGuideColorPalette extends React.Component {

    render() {
        const {colors} = this.props;

        const Swatch = (props) => {

            const {hex} = props;

            return (
                <span className={compStyles.swatch} style={{backgroundColor: hex}}/>
            )
        };

        const Palette = (props) => {

            const {palette} = props,
                {hex, name, variable} = palette;

            return (
                <div className={compStyles.palette}>
                    <div className={classNames(globalStyles.flex, compStyles.upper)}>
                        <h4>{name}</h4><Swatch hex={hex}/>
                    </div>
                    <div className={classNames(globalStyles.flex, compStyles.lower)}>
                        <p className={compStyles.variable}>"{variable}"</p><Hero small>{hex}</Hero>
                    </div>
                </div>
            )

        };

        return (
            <>
            {colors ? colors.map((palette, i) => <Palette key={i} palette={palette}/>) : null}
            </>
        );
    }
}

export default () => {

    const colors = ColorPaletteStaticQuery();

    return (
        <StyleGuideColorPalette colors={colors}/>
    );
}

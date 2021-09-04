/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide color palette component.
 * Used by the markdown page "/anvil-style-guide/color-palette".
 * <style-guide-color-palette></style-guide-color-palette>.
 */

// Core dependencies
import React from "react";

// App dependencies
import { ColorPaletteStaticQuery } from "../../hooks/color-palette-query";

// Styles
import compStyles from "./style-guide-color-palette.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

function StyleGuideColorPalette() {
  const colors = ColorPaletteStaticQuery();

  const Swatch = (props) => {
    const { hex } = props;

    return (
      <span className={compStyles.swatch} style={{ backgroundColor: hex }} />
    );
  };

  const Palette = (props) => {
    const { palette } = props,
      { hex, name, variable } = palette;

    return (
      <div className={compStyles.palette}>
        <div className={classNames(globalStyles.flex, compStyles.upper)}>
          <h4>{name}</h4>
          <Swatch hex={hex} />
        </div>
        <div className={classNames(globalStyles.flex, compStyles.lower)}>
          <p className={compStyles.variable}>"{variable}"</p>
          <p>{hex}</p>
        </div>
      </div>
    );
  };

  return colors.map((palette, c) => <Palette key={c} palette={palette} />);
}

export default StyleGuideColorPalette;

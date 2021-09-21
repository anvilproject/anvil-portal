/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - logo font component. Displays text in logo font typography.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./logo-font.module.css";

const LogoFont = React.forwardRef((props, ref) => {
  const { children } = props;
  const logoRef = ref ? { ref: ref } : null;

  return (
    <span className={compStyles.logoFont} {...logoRef}>
      {children}
    </span>
  );
});

export default LogoFont;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - hero component.
 * Use of this component within markdown is possible.
 * Use the tag <hero>hero text</hero> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./hero.module.css";

const Hero = React.forwardRef((props, ref) => {
  const { children } = props;
  const heroRef = ref ? { ref: ref } : null;

  return (
    <div className={compStyles.hero} {...heroRef}>
      {children}
    </div>
  );
});

export default Hero;

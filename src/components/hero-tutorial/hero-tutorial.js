/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - hero tutorial component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Breadcrumb from "../breadcrumb/breadcrumb";
import ContextFrontmatter from "../context-frontmatter/context-frontmatter";

// Styles
import compStyles from "./hero-tutorial.module.css";

function HeroTutorial(props) {
  const { children } = props;
  const { breadcrumb } = useContext(ContextFrontmatter);

  return (
    <div className={compStyles.hero}>
      <Breadcrumb breadcrumb={breadcrumb} />
      {children}
    </div>
  );
}

export default HeroTutorial;

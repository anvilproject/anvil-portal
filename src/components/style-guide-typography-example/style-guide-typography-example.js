/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide typography example component.
 * Used by the markdown page "/anvil-style-guide/typography-examples".
 * Use the closed tag syntax <style-guide-typography-example></style-guide-typography-example>.
 */

// Core dependencies
import React from "react";

// App dependencies
import StyleGuideTypographyExampleHeading from "../style-guide-typography-example-heading/style-guide-typography-example-heading";

// Styles
import compStyles from "./style-guide-typography-example.module.css";

// Template variables
const examples = ["h1", "h2", "h3", "h4", "h5", "p"];

function StyleGuideTypographyExample() {
  const Example = (props) => {
    const { example } = props;

    return (
      <div className={compStyles.example}>
        <StyleGuideTypographyExampleHeading example={example} />
        <p className={compStyles.latin}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt utlabore et dolore magna aliqua.
        </p>
      </div>
    );
  };

  return examples.map((example, e) => <Example key={e} example={example} />);
}

export default StyleGuideTypographyExample;

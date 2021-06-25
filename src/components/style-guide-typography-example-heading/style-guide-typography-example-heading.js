/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide typography example heading component.
 */

// Core dependencies
import React, { useEffect, useRef, useState } from "react";

// Styles
import compStyles from "./style-guide-typography-example-heading.module.css";

// Template variables
const headingLabels = {
  h1: "Heading One",
  h2: "Heading Two",
  h3: "Heading Three",
  h4: "Heading Four",
  h5: "Heading Five"
};

function StyleGuideTypographyExampleHeading(props) {
  const { example } = props;
  const headingRef = useRef(null);
  const [styles, setStyles] = useState({
    marginBottom: "0",
    paddingBottom: "0"
  });
  const { marginBottom, paddingBottom } = styles || {};
  const heading = headingLabels[example];
  const Tag = example;

  const MarginBottom = () => {
    return (
      <span
        className={compStyles.marginIndicator}
        style={{ height: marginBottom, marginTop: paddingBottom }}
      >
        <span className={compStyles.marginText}>margin {marginBottom}</span>
      </span>
    );
  };

  /* useEffect - componentDidMount. */
  /* Grab styles from the heading ref. */
  useEffect(() => {
    if (headingRef && headingRef.current !== null) {
      /* Grab the typography element. */
      const headingStyles = window.getComputedStyle(headingRef.current);

      /* Set the styles. */
      setStyles(styles => ({
        ...styles,
        marginBottom: headingStyles.marginBottom,
        paddingBottom: headingStyles.paddingBottom
      }));
    }
  }, []);

  return (
    <Tag className={compStyles.heading} ref={headingRef}>
      {heading}
      <MarginBottom />
    </Tag>
  );
}

export default StyleGuideTypographyExampleHeading;

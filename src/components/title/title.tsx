/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - title component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./title.module.css";

interface TitleProps {
  title: string;
}

function Title(props: TitleProps): JSX.Element {
  const { title } = props;

  return <h1 className={compStyles.title}>{title}</h1>;
}

export default Title;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - title component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./title.module.css";

interface TitleProps {
  subTitle: string;
  title: string;
}

function Title(props: TitleProps) {
  const { subTitle, title } = props;

  return (
    <h1 className={compStyles.title}>
      <span>
        <span>{title}</span>
        {subTitle && (
          <span className={compStyles.subTitle}> &gt; {subTitle}</span>
        )}
      </span>
    </h1>
  );
}

export default Title;

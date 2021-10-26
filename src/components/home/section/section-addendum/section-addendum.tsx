/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section addendum component.
 * Positions any content at the end of the section.
 * Positioning is achieved by utilizing the grid template rows defined by the section class "sectionMain".
 */

// Core dependencies
import React, { FC, ReactNode } from "react";

// Styles
import { sectionAddendum } from "./section-addendum.module.css";

interface Props {
  children: ReactNode;
}

const SectionAddendum: FC<Props> = ({ children }): JSX.Element => {
  return <div className={sectionAddendum}>{children}</div>;
};

export default SectionAddendum;

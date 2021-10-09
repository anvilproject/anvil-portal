/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section component.
 */

// Core dependencies
import React, { FC, ReactNode } from "react";

// App dependencies
import SectionType from "./section-type/section-type";

// Styles
import { sectionBanner, sectionHero, sectionMain } from "./section.module.css";

interface Props {
  children: ReactNode;
  sectionType?: SectionType;
}

const Section: FC<Props> = ({ children, sectionType }): JSX.Element => {
  let sectionClass = sectionMain;
  if (sectionType === SectionType.BANNER) {
    sectionClass = sectionBanner;
  }
  if (sectionType === SectionType.HERO) {
    sectionClass = sectionHero;
  }
  return <section className={sectionClass}>{children}</section>;
};

Section.defaultProps = {
  sectionType: SectionType.DEFAULT,
};

export default Section;

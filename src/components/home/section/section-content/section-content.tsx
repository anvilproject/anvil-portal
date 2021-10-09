/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section content component.
 */

// Core dependencies
import React, { FC, ReactNode } from "react";

// App dependencies
import SectionContentPosition from "../section-content-position/section-content-position";

// Styles
import {
  sectionContent,
  sectionContentLeft,
  sectionContentRight,
  sectionCTAs,
  sectionHeading,
  sectionMediaRight,
} from "./section-content.module.css";

interface Props {
  children: ReactNode[];
  position?: SectionContentPosition;
}

const SectionContent: FC<Props> = ({
  children,
  position = SectionContentPosition.DEFAULT_FULL_WIDTH,
}): JSX.Element => {
  const [heading, content, callToActions] = children;
  let sectionContentClassName = sectionContent;
  if (position === SectionContentPosition.DEFAULT_LEFT) {
    sectionContentClassName = sectionContentLeft;
  }
  if (position === SectionContentPosition.DEFAULT_RIGHT) {
    sectionContentClassName = sectionContentRight;
  }
  if (position === SectionContentPosition.MEDIA_RIGHT) {
    sectionContentClassName = sectionMediaRight;
  }
  return (
    <>
      {/* Heading */}
      {heading ? <h2 className={sectionHeading}>{heading}</h2> : null}
      {/* DEFAULT_FULL_WIDTH content: consumes all available content width. */}
      {/* DEFAULT_LEFT & DEFAULT_RIGHT & MEDIA_RIGHT: consume 50% available content width. */}
      <div className={sectionContentClassName}>
        {/* Content */}
        {content || null}
        {/* CTAs */}
        {callToActions ? (
          <div className={sectionCTAs}>{callToActions}</div>
        ) : null}
      </div>
    </>
  );
};

SectionContent.defaultProps = {
  position: SectionContentPosition.DEFAULT_FULL_WIDTH,
};

export default SectionContent;

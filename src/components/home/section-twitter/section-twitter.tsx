/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section twitter component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import SectionContentPosition from "../section/section-content-position/section-content-position";
import TwitterTimeline from "../../twitter-timeline/twitter-timeline";

const SectionTwitter: FC = (): JSX.Element => {
  return (
    <Section>
      {/* Section Content - LHS. */}
      <SectionContent position={SectionContentPosition.DEFAULT_FULL_WIDTH}>
        {/* Heading */}
        <>Join the Conversation</>
        {/* Hero */}
        {null}
        {/* Content */}
        <TwitterTimeline />
        {/* CTAs */}
        {null}
      </SectionContent>
    </Section>
  );
};

export default SectionTwitter;

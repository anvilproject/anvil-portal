/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section latest updates component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import ButtonCta from "../../button-cta/button-cta";
import EventCard, { IEventCard } from "../event-card/event-card";
import { EventCloudStaticQuery } from "../../../hooks/event-cloud-query";
import { NewsCloudStaticQuery } from "../../../hooks/news-cloud-query";
import { UpdateCloudStaticQuery } from "../../../hooks/update-cloud-query";
import NewsCard, { INewsCard } from "../news-card/news-card";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import SectionContentPosition from "../section/section-content-position/section-content-position";

// Styles
import { sectionCardHeading } from "./section-lastest-updates.module.css";
import { sectionHero } from "../section-workspace-cloud/section-workspace-cloud.module.css";

const SectionLatestUpdates: FC = (): JSX.Element => {
  const eventCards: IEventCard[] = EventCloudStaticQuery();
  const newsCards: INewsCard[] = NewsCloudStaticQuery();
  const frontmatter = UpdateCloudStaticQuery();
  const hero = frontmatter.sectionSubHeader;

  return (
    <Section>
      {/* Section Content - LHS. */}
      <SectionContent position={SectionContentPosition.DEFAULT_LEFT}>
        {/* Heading */}
        <>Updates, training events, and workshops</>
        {/* Hero */}
        {hero ? (
          <div className={sectionHero}>
            <h4>{hero}</h4>
          </div>
        ) : null}
        {/* Content */}
        <>
          <h3 className={sectionCardHeading}>News</h3>
          {newsCards.map((card, i) => (
            <NewsCard key={`${card.title}${i}`} newsCard={card} />
          ))}
        </>
        {/* CTAs */}
        <>
          <ButtonCta
            attributeHREF="/news"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            More News
          </ButtonCta>
        </>
      </SectionContent>
      {/* Section Content - RHS. */}
      <SectionContent position={SectionContentPosition.DEFAULT_RIGHT}>
        {/* Heading */}
        {null}
        {/* Hero */}
        {null}
        {/* Content */}
        <>
          <h3 className={sectionCardHeading}>Events</h3>
          {eventCards.map((card, i) => (
            <EventCard key={`${card.title}${i}`} eventCard={card} />
          ))}
        </>
        {/* CTAs */}
        <>
          <ButtonCta
            attributeHREF="/events"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            More Events
          </ButtonCta>
        </>
      </SectionContent>
    </Section>
  );
};

export default SectionLatestUpdates;

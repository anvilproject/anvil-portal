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
import NewsCard, { INewsCard } from "../news-card/news-card";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import SectionContentPosition from "../section/section-content-position/section-content-position";

// Styles
import { sectionCardHeading } from "./section-lastest-updates.module.css";

const SectionLatestUpdates: FC = (): JSX.Element => {
  const eventCards: IEventCard[] = EventCloudStaticQuery();
  const newsCards: INewsCard[] = NewsCloudStaticQuery();
  return (
    <Section>
      {/* Section Content - LHS. */}
      <SectionContent position={SectionContentPosition.DEFAULT_LEFT}>
        {/* Heading */}
        <>Latest updates, training events and workshops</>
        {/* Hero */}
        {null}
        {/* Content */}
        <>
          <h3 className={sectionCardHeading}>News</h3>
          {newsCards.map((card) => (
            <NewsCard key={card.title} newsCard={card} />
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
          {eventCards.map((card) => (
            <EventCard key={card.title} eventCard={card} />
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

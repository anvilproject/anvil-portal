/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL event card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";

// Styles
import {
  bubbleDayOfMonth,
  bubbleMonth,
  bubbleYear,
  card,
  cardContainer,
  cardDate,
  cardTitle,
} from "./event-card.module.css";

export interface IEventCard extends ICard {
  dateBubble: [string, string, string];
}

interface Props {
  eventCard: IEventCard;
}

const EventCard: FC<Props> = ({ eventCard }): JSX.Element => {
  const { cardLink, dateBubble, title } = eventCard;
  const [month, dayOfMonth, year] = dateBubble;
  return (
    <div className={card}>
      <ButtonCta attributeHREF={cardLink || "/"}>
        <div className={cardContainer}>
          <span className={cardDate}>
            <span className={bubbleDayOfMonth}>{dayOfMonth}</span>
            <span className={bubbleMonth}>{month}</span>
            <span className={bubbleYear}>{year}</span>
          </span>
          <span className={cardTitle}>{title}</span>
        </div>
      </ButtonCta>
    </div>
  );
};

export default EventCard;

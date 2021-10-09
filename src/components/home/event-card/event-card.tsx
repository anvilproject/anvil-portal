/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL event card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";

// Styles
import {
  bubbleDayOfMonth,
  bubbleMonth,
  bubbleYear,
  card,
  cardDate,
  cardTitle,
} from "./event-card.module.css";

export interface IEventCard extends ICard {
  dateBubble: [string, string, string];
  link: string;
}

interface Props {
  eventCard: IEventCard;
}

const EventCard: FC<Props> = ({ eventCard }): JSX.Element => {
  const { dateBubble, link, title } = eventCard;
  const [month, dayOfMonth, year] = dateBubble;
  return (
    <a className={card} href={link}>
      <span className={cardDate}>
        <span className={bubbleDayOfMonth}>{dayOfMonth}</span>
        <span className={bubbleMonth}>{month}</span>
        <span className={bubbleYear}>{year}</span>
      </span>
      <span className={cardTitle}>{title}</span>
    </a>
  );
};

export default EventCard;

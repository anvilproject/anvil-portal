/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL news card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";

// Styles
import { card, cardDate, cardTitle } from "./news-card.module.css";

export interface INewsCard extends ICard {
  date: string;
  link: string;
}

interface Props {
  newsCard: INewsCard;
}

const NewsCard: FC<Props> = ({ newsCard }): JSX.Element => {
  const { date, link, title } = newsCard;
  return (
    <a className={card} href={link}>
      <span className={cardTitle}>{title}</span>
      <span className={cardDate}>{date}</span>
    </a>
  );
};

export default NewsCard;

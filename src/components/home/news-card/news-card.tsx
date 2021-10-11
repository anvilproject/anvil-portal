/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL news card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";

// Styles
import {
  card,
  cardContainer,
  cardDate,
  cardTitle,
} from "./news-card.module.css";

export interface INewsCard extends ICard {
  date: string;
}

interface Props {
  newsCard: INewsCard;
}

const NewsCard: FC<Props> = ({ newsCard }): JSX.Element => {
  const { cardLink, date, title } = newsCard;
  return (
    <div className={card}>
      <ButtonCta attributeHREF={cardLink || "/"}>
        <div className={cardContainer}>
          <span className={cardTitle}>{title}</span>
          <span className={cardDate}>{date}</span>
        </div>
      </ButtonCta>
    </div>
  );
};

export default NewsCard;

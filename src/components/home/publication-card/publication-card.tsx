/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL publication card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";

// Styles
import { card, cardCitation } from "./publication-card.module.css";

export interface IPublicationCard extends ICard {
  citation: string;
}

interface Props {
  publicationCard: IPublicationCard;
}

const PublicationCard: FC<Props> = ({ publicationCard }): JSX.Element => {
  const { citation, title } = publicationCard;
  return (
    <a className={card} href="/">
      <span>{title}</span>
      <span className={cardCitation}> - {citation}</span>
    </a>
  );
};

export default PublicationCard;

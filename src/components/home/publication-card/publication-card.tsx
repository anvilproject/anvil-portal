/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL publication card component.
 */

// Core dependencies
import React, { FC, MouseEvent, useState } from "react";

// App dependencies
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";

// Styles
import { card, cardAction, cardCitation } from "./publication-card.module.css";

interface ICitation {
  authors: string[];
  doi: string;
  journal: string;
  publisher: string;
  year: string;
}

export interface IPublicationCard extends ICard {
  citation: ICitation;
}

interface Props {
  publicationCard: IPublicationCard;
}

const PublicationCard: FC<Props> = ({ publicationCard }): JSX.Element => {
  const [fullCitation, setFullCitation] = useState<boolean>(false);
  const { cardLink, citation, title } = publicationCard;
  const { authors, doi, journal, year } = citation;
  const fewAuthors = authors.slice(0, 5);
  const authorsAsString = fullCitation
    ? authors.join(", ")
    : fewAuthors.join(", ");
  const toggleCitation = authors.length > 5;
  const showLess = toggleCitation && fullCitation;
  const showMore = toggleCitation && !fullCitation;

  const onHandleShowCitation = (
    mouseEvent: MouseEvent<HTMLButtonElement>,
    showAllAuthors: boolean
  ): void => {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    setFullCitation(showAllAuthors);
  };

  return (
    <div className={card}>
      <ButtonCta attributeHREF={cardLink || "/"}>
        <span>{title}</span>
        <span className={cardCitation}>
          <span> - {authorsAsString}</span>
          {fullCitation ? <span>.</span> : <span>, et al.</span>}
          <span> ({year}).</span>
          <span> {journal}.</span>
          <span> doi: {doi}</span>
          <span>.</span>
          {showLess ? (
            <button
              className={cardAction}
              onClick={(e) => onHandleShowCitation(e, false)}
              type="button"
            >
              [Show less]
            </button>
          ) : null}
          {showMore ? (
            <button
              className={cardAction}
              onClick={(e) => onHandleShowCitation(e, true)}
              type="button"
            >
              [Show more]
            </button>
          ) : null}
        </span>
      </ButtonCta>
    </div>
  );
};

export default PublicationCard;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL benefit card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";

// Styles
import { card, cardContent, cardTitle } from "./benefit-card.module.css";

interface Props {
  benefitCard: ICard;
}

const BenefitCard: FC<Props> = ({ benefitCard }): JSX.Element => {
  const { text, title } = benefitCard;
  return (
    <div className={card}>
      <h4 className={cardTitle}>{title}</h4>
      <p className={cardContent}>{text}</p>
    </div>
  );
};

export default BenefitCard;

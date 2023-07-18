/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dataset card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";
import { Target } from "../../target/target.model";

// Styles
import {
  card,
  cardAction,
  cardActions,
  cardHeader,
  cardSubTitle,
  cardTitle,
} from "./dataset-card.module.css";

interface Props {
  datasetCard: ICard;
}

const DatasetCard: FC<Props> = ({ datasetCard }): JSX.Element => {
  const { actions, subTitle, title } = datasetCard;
  return (
    <div className={card}>
      <div className={cardHeader}>
        <h4 className={cardTitle}>{title}</h4>
        <div className={cardSubTitle}>{subTitle}</div>
      </div>
      <div className={cardActions}>
        {actions?.map(({ label, url }) => (
          <ButtonCta
            attributeHREF={url || "/"}
            attributeTarget={Target.SELF}
            key={label}
          >
            <span className={cardAction}>{label}</span>
          </ButtonCta>
        ))}
      </div>
    </div>
  );
};

export default DatasetCard;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dataset card component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";
import Target from "../../target/target.model";

// Styles
import {
  card,
  cardAction,
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
      {actions.map(({ label, url }) => (
        <a
          key={label}
          className={cardAction}
          href={url}
          rel="noopener"
          target={Target.BLANK}
        >
          {label}
        </a>
      ))}
    </div>
  );
};

export default DatasetCard;

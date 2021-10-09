/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL tech card component.
 */

// Core dependencies
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";
import Target from "../../target/target.model";

// Styles
import {
  card,
  cardAction,
  cardActions,
  cardBody,
  cardContent,
  cardThumbnail,
  cardTitle,
} from "./tech-card.module.css";

interface Props {
  techCard: ICard;
}

const TechCard: FC<Props> = ({ techCard }): JSX.Element => {
  const { actions, text, thumbnail, title } = techCard;
  const img = thumbnail ? getImage(thumbnail) : undefined;
  return (
    <div className={card}>
      <div className={cardThumbnail}>
        {img ? <GatsbyImage alt="logo" image={img} /> : null}
      </div>
      <div className={cardBody}>
        <h4 className={cardTitle}>{title}</h4>
        <p className={cardContent}>{text}</p>
        <div className={cardActions}>
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
      </div>
    </div>
  );
};

export default TechCard;

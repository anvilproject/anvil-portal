/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL workspace card component.
 */

// Core dependencies
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";

// Styles
import {
  card,
  cardContent,
  cardHeader,
  cardThumbnail,
  cardTitle,
} from "./workspace-card.module.css";

interface Props {
  workspaceCard: ICard;
}

const WorkspaceCard: FC<Props> = ({ workspaceCard }): JSX.Element => {
  const { text, thumbnail, title } = workspaceCard;
  const img = thumbnail ? getImage(thumbnail) : undefined;
  return (
    <div className={card}>
      <div className={cardHeader}>
        <div className={cardThumbnail}>
          {img ? <GatsbyImage alt="logo" image={img} /> : null}
        </div>
        <h4 className={cardTitle}>{title}</h4>
      </div>
      <div className={cardContent}>{text}</div>
    </div>
  );
};

export default WorkspaceCard;

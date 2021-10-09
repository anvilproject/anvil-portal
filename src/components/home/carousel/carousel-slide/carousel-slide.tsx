/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel slide component.
 *
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../../card/card";

// Styles
import {
  active,
  cardHeader,
  cardMediaFrame,
  cardSubTitle,
  cardTitle,
  slot,
} from "./carousel-slide.module.css";

interface Props {
  showSlide: boolean;
  slide: ICard;
}

const CarouselSlide: FC<Props> = ({ showSlide, slide }): JSX.Element => {
  const { media, subTitle, title } = slide;
  const img = media ? getImage(media) : undefined;
  return (
    <div className={classNames({ [active]: showSlide }, slot)}>
      <div className={cardHeader}>
        <h3 className={cardTitle}>{title}</h3>
        <span className={cardMediaFrame}>
          {img ? (
            <GatsbyImage alt="logo" draggable={false} image={img} />
          ) : null}
        </span>
      </div>
      <span className={cardSubTitle}>{subTitle}</span>
    </div>
  );
};

export default CarouselSlide;

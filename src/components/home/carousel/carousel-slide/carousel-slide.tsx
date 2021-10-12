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
import ButtonCta from "../../../button-cta/button-cta";
import { ICard } from "../../../card/card";

// Styles
import {
  active,
  cardAction,
  cardActions,
  cardMediaFrame,
  cardMediaLandscape,
  cardMediaPortrait,
  cardSubTitle,
  cardTitle,
  slot,
} from "./carousel-slide.module.css";

interface Props {
  showSlide: boolean;
  slide: ICard;
}

const CarouselSlide: FC<Props> = ({ showSlide, slide }): JSX.Element => {
  const { actions, media, subTitle, title } = slide;
  const { landscape, portrait } = media || {};
  const landscapeImg = landscape ? getImage(landscape) : undefined;
  const portraitImg = portrait ? getImage(portrait) : undefined;
  return (
    <div className={classNames({ [active]: showSlide }, slot)}>
      <h3 className={cardTitle}>
        <span>{title}</span>
      </h3>
      <span className={cardActions}>
        {actions?.map(({ label, url }) => (
          <ButtonCta attributeHREF={url || "/"} key={label}>
            <span className={cardAction}>{label}</span>
          </ButtonCta>
        ))}
      </span>
      <span className={cardMediaFrame}>
        {landscapeImg ? (
          <GatsbyImage
            alt="logo"
            className={cardMediaLandscape}
            draggable={false}
            image={landscapeImg}
            objectFit="contain"
            style={{ maxHeight: "80%", maxWidth: "80%" }}
          />
        ) : null}
        {portraitImg ? (
          <GatsbyImage
            alt="logo"
            className={cardMediaPortrait}
            draggable={false}
            image={portraitImg}
            objectFit="contain"
            style={{ maxHeight: "80%", maxWidth: "80%" }}
          />
        ) : null}
      </span>
      <span className={cardSubTitle}>
        <span>{subTitle}</span>
      </span>
    </div>
  );
};

export default CarouselSlide;

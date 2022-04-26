/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel slide component.
 *
 */

// Core dependencies
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import ButtonCta from "../../../button-cta/button-cta";
import { ICard } from "../../../card/card";

// Styles
import * as compStyles from "./carousel-slide.module.css";

interface Props {
  showSlide: boolean;
  slow: boolean;
  slide: ICard;
}

const CarouselSlide: FC<Props> = ({ showSlide, slow, slide }): JSX.Element => {
  const { actions, media, subTitle, title } = slide;
  const { landscape, portrait } = media || {};
  const landscapeImg = landscape ? getImage(landscape) : undefined;
  const portraitImg = portrait ? getImage(portrait) : undefined;
  const classNamesTransition = slow
    ? {
        enter: compStyles.cardShow,
        enterActive: compStyles.cardShowSlowActive,
        enterDone: compStyles.cardShowDone,
        exit: compStyles.cardHideSlow,
        exitActive: compStyles.cardHideSlowActive,
        exitDone: compStyles.cardHidden,
      }
    : {
        enter: compStyles.cardShow,
        enterActive: compStyles.cardShowFastActive,
        enterDone: compStyles.cardShowDone,
        exit: compStyles.cardHidden,
        exitDone: compStyles.cardHidden,
      };
  const timeoutTransition = {
    enter: slow ? 2100 : 600,
    exit: slow ? 2100 : 0,
  };
  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={showSlide}
      timeout={timeoutTransition}
      appear
    >
      <div className={compStyles.slot}>
        <h3 className={compStyles.cardTitle}>
          <span>{title}</span>
        </h3>
        <span className={compStyles.cardActions}>
          {actions?.map(({ label, url }) => (
            <ButtonCta attributeHREF={url || "/"} key={label}>
              <span className={compStyles.cardAction}>{label}</span>
            </ButtonCta>
          ))}
        </span>
        <span className={compStyles.cardMediaFrame}>
          {landscapeImg ? (
            <GatsbyImage
              alt="logo"
              className={compStyles.cardMediaLandscape}
              draggable={false}
              image={landscapeImg}
              objectFit="contain"
              style={{ maxHeight: "80%", maxWidth: "80%" }}
            />
          ) : null}
          {portraitImg ? (
            <GatsbyImage
              alt="logo"
              className={compStyles.cardMediaPortrait}
              draggable={false}
              image={portraitImg}
              objectFit="contain"
              style={{ maxHeight: "80%", maxWidth: "80%" }}
            />
          ) : null}
        </span>
        <span className={compStyles.cardSubTitle}>
          <span>{subTitle}</span>
        </span>
      </div>
    </CSSTransition>
  );
};

export default CarouselSlide;

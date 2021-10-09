/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel bullets component.
 *
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../../card/card";

// Styles
import { active, bullet, bullets } from "./carousel-bullets.module.css";

interface Props {
  activeSlide: number;
  setActiveSlide: (slideIndex: number) => void;
  slides: ICard[];
}

const CarouselBullets: FC<Props> = ({
  activeSlide,
  setActiveSlide,
  slides,
}): JSX.Element => {
  return (
    <div className={bullets}>
      {slides.map(({ title }, s) => (
        <span
          aria-label={`Jump to slide ${title}`}
          className={classNames(
            {
              [active]: s === activeSlide,
            },
            bullet
          )}
          key={title}
          onClick={() => setActiveSlide(s)}
          onKeyDown={() => setActiveSlide(s)}
          role="button"
          tabIndex={0}
        />
      ))}
    </div>
  );
};

export default CarouselBullets;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel slideshow component.
 *
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../../card/card";
import CarouselSlide from "../carousel-slide/carousel-slide";

// Styles
import { slider } from "./carousel-slideshow.module.css";

interface Props {
  activeSlide: number;
  slides: ICard[];
}

const CarouselSlideshow: FC<Props> = ({ activeSlide, slides }): JSX.Element => {
  return (
    <div className={slider}>
      {slides.map((slide, i) => (
        <CarouselSlide
          key={slide.title}
          showSlide={i === activeSlide}
          slide={slide}
        />
      ))}
    </div>
  );
};

export default CarouselSlideshow;

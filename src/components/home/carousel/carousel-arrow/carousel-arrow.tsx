/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel arrow component.
 *
 */

// Core dependencies
import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";

// App dependencies
import Button from "../../../button/button";
import CarouselDirection from "../carousel-direction/carousel-direction";

// Template variables
const forwardArrow = "../../../../../images/icon/next.png";
const backwardArrow = "../../../../../images/icon/previous.png";

interface Props {
  action: (swipeDirection: string) => void;
  direction: CarouselDirection;
}

const CarouselArrow: FC<Props> = ({ action, direction }): JSX.Element => {
  const forwards = direction === CarouselDirection.FORWARD;

  return (
    <Button clickAction={action} icon>
      {forwards ? (
        <StaticImage
          alt="prev"
          placeholder="none"
          src={forwardArrow}
          width={16}
        />
      ) : (
        <StaticImage
          alt="prev"
          placeholder="none"
          src={backwardArrow}
          width={16}
        />
      )}
    </Button>
  );
};

export default CarouselArrow;

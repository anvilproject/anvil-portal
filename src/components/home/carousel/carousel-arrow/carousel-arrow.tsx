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
import CarouselAction from "../carousel-action/carousel-action";

// Styles
import { carouselArrow } from "./carousel-arrow.module.css";

// Template variables
const forwardArrow = "../../../../../images/icon/next.png";
const backwardArrow = "../../../../../images/icon/previous.png";

interface Props {
  action: (carouselAction: string) => void;
  direction: CarouselAction;
}

const CarouselArrow: FC<Props> = ({ action, direction }): JSX.Element => {
  const forwards = direction === CarouselAction.SWIPE_FORWARD;

  return (
    <div className={carouselArrow}>
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
    </div>
  );
};

export default React.memo(CarouselArrow);

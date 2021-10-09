/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel component.
 *
 */

// Core dependencies
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

// App dependencies
import { ICard } from "../../card/card";
import CarouselArrow from "./carousel-arrow/carousel-arrow";
import CarouselBullets from "./carousel-bullets/carousel-bullets";
import CarouselDirection from "./carousel-direction/carousel-direction";
import CarouselSlideshow from "./carousel-slideshow/carousel-slideshow";

// Styles
import { carousel, carouselBody } from "./carousel.module.css";
import { slider } from "./carousel-slideshow/carousel-slideshow.module.css";

interface IEventCoordinates {
  x: number;
  y: number;
}

interface Props {
  slides: ICard[];
}

type CarouselDirectionState = CarouselDirection;

const Carousel: FC<Props> = ({ slides }): JSX.Element => {
  const initCoords = useRef<IEventCoordinates>({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<CarouselDirectionState>(
    CarouselDirection.NONE
  );
  const lastSlideIndex = slides.length - 1;

  const calculateSwipeDirection = useCallback(
    (coords: IEventCoordinates): CarouselDirection => {
      const { x: x0, y: y0 } = initCoords.current; // Start coordinates.
      const { x: x1, y: y1 } = coords; // End coordinates.

      /* Calculate the difference between mouse/touch start and end coordinates. */
      const dx = x1 - x0;
      const dy = y1 - y0;

      /* Calculate swipe direction. */
      const swiping = Math.abs(dx) > Math.abs(dy);
      const s = Math.sign(dx);
      /* Start with neutral direction. */
      let direction = CarouselDirection.NONE;
      if (swiping) {
        /* Backwards. */
        if (s > 0) {
          direction = CarouselDirection.BACKWARD;
        }
        /* Forwards. */
        if (s < 0) {
          direction = CarouselDirection.FORWARD;
        }
      }
      return direction;
    },
    []
  );

  const changedTouches = useCallback((touchEvent: TouchEvent): Touch => {
    return touchEvent.changedTouches[0];
  }, []);

  const getMouseCoords = useCallback(
    (mouseEvent: MouseEvent): IEventCoordinates => {
      const x = mouseEvent.clientX;
      const y = mouseEvent.clientY;
      return { x, y };
    },
    []
  );

  const getTouchCoords = useCallback(
    (touchEvent: TouchEvent): IEventCoordinates => {
      const x = changedTouches(touchEvent).clientX;
      const y = changedTouches(touchEvent).clientY;
      return { x, y };
    },
    [changedTouches]
  );

  const swipeToSlide = useCallback(
    (increment: number): void => {
      /* Increment slide index either way. */
      let index = activeSlide + increment;
      if (index < 0) {
        /* The direction is BACKWARDS; */
        /* If the new index is negative, rotate to the end of the slide deck. */
        index = lastSlideIndex;
      } else if (index > lastSlideIndex) {
        /* The direction is FORWARDS. */
        /* If the new index is greater than the number of possible slides, rotate to the start of the slide deck. */
        index = 0;
      }
      /* Set new rotation index. */
      setActiveSlide(index);
    },
    [activeSlide, lastSlideIndex]
  );

  const onMouseDown = useCallback(
    (mouseEvent: MouseEvent): void => {
      initCoords.current = getMouseCoords(mouseEvent);
    },
    [getMouseCoords]
  );

  const onMouseUp = useCallback(
    (mouseEvent: MouseEvent): void => {
      /* Set new swipe direction. */
      const coords = getMouseCoords(mouseEvent);
      const direction = calculateSwipeDirection(coords);
      setSwipeDirection(direction);
      /* Clear mouse down coordinates ready for next event. */
      initCoords.current = { x: 0, y: 0 };
    },
    [calculateSwipeDirection, getMouseCoords]
  );

  const onTouchEnd = useCallback(
    (touchEvent: TouchEvent): void => {
      /* Set new swipe direction. */
      const coords = getTouchCoords(touchEvent);
      const direction = calculateSwipeDirection(coords);
      setSwipeDirection(direction);
      /* Clear touch start coordinates ready for next event. */
      initCoords.current = { x: 0, y: 0 };
    },
    [calculateSwipeDirection, getTouchCoords]
  );

  const onTouchMove = useCallback(
    (touchEvent: TouchEvent): void => {
      const coords = getTouchCoords(touchEvent);
      const direction = calculateSwipeDirection(coords);
      /* Prevent scroll if swipe direction is either forwards or backwards. */
      if (direction !== CarouselDirection.NONE && touchEvent.cancelable) {
        touchEvent.preventDefault();
        touchEvent.stopPropagation();
      }
    },
    [calculateSwipeDirection, getTouchCoords]
  );

  const onTouchStart = useCallback(
    (touchEvent: TouchEvent): void => {
      initCoords.current = getTouchCoords(touchEvent);
    },
    [getTouchCoords]
  );

  const removeTouchInteractions = useCallback(
    (sliderEl: HTMLDivElement): void => {
      sliderEl.removeEventListener("mousedown", (e) => onMouseDown(e));
      sliderEl.removeEventListener("mouseup", (e) => onMouseUp(e));
      sliderEl.removeEventListener("touchend", (e) => onTouchEnd(e));
      sliderEl.removeEventListener("touchmove", (e) => onTouchMove(e));
      sliderEl.removeEventListener("touchstart", (e) => onTouchStart(e));
    },
    [onMouseDown, onMouseUp, onTouchEnd, onTouchMove, onTouchStart]
  );

  const setTouchInteractions = useCallback(
    (sliderEl: HTMLDivElement): void => {
      sliderEl.addEventListener("mousedown", (e) => onMouseDown(e));
      sliderEl.addEventListener("mouseup", (e) => onMouseUp(e));
      sliderEl.addEventListener("touchend", (e) => onTouchEnd(e));
      sliderEl.addEventListener("touchmove", (e) => onTouchMove(e), {
        passive: false,
      });
      sliderEl.addEventListener("touchstart", (e) => onTouchStart(e), {
        passive: true,
      });
    },
    [onMouseDown, onMouseUp, onTouchEnd, onTouchMove, onTouchStart]
  );

  /* useEffect - componentDidMount. */
  useEffect(() => {
    /* Set touch interactions. */
    /* Grab the slider element. */
    const sliderEl = document.getElementsByClassName(
      slider
    )[0] as HTMLDivElement;
    setTouchInteractions(sliderEl);

    return () => {
      /* Remove touch interactions. */
      removeTouchInteractions(sliderEl);
    };
  }, [removeTouchInteractions, setTouchInteractions]);

  useEffect(() => {
    if (swipeDirection === CarouselDirection.FORWARD) {
      swipeToSlide(1);
      setSwipeDirection(CarouselDirection.NONE);
    } else if (swipeDirection === CarouselDirection.BACKWARD) {
      swipeToSlide(-1);
      setSwipeDirection(CarouselDirection.NONE);
    }
  }, [swipeDirection, swipeToSlide]);

  return (
    <div className={carousel}>
      <CarouselArrow
        action={() => setSwipeDirection(CarouselDirection.BACKWARD)}
        direction={CarouselDirection.BACKWARD}
      />
      <div className={carouselBody}>
        <CarouselSlideshow activeSlide={activeSlide} slides={slides} />
        <CarouselBullets
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          slides={slides}
        />
      </div>
      <CarouselArrow
        action={() => setSwipeDirection(CarouselDirection.FORWARD)}
        direction={CarouselDirection.FORWARD}
      />
    </div>
  );
};

export default Carousel;

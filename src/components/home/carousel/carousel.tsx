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
import CarouselAction from "./carousel-action/carousel-action";
import CarouselArrow from "./carousel-arrow/carousel-arrow";
import CarouselBullets from "./carousel-bullets/carousel-bullets";
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

type CarouselActionState = CarouselAction;

const Carousel: FC<Props> = ({ slides }): JSX.Element => {
  const initCoords = useRef<IEventCoordinates>({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [slideAction, setSlideAction] = useState<CarouselActionState>(
    CarouselAction.NONE
  );
  const [slow, setSlow] = useState<boolean>(false);
  const lastSlideIndex = slides.length - 1;

  const calculateSwipeDirection = useCallback(
    (coords: IEventCoordinates): CarouselAction => {
      const { x: x0, y: y0 } = initCoords.current; // Start coordinates.
      const { x: x1, y: y1 } = coords; // End coordinates.

      /* Calculate the difference between mouse/touch start and end coordinates. */
      const dx = x1 - x0;
      const dy = y1 - y0;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      /* Calculate slide action. */
      /* Start with neutral action. */
      let action = CarouselAction.NONE;
      if (absX < 8 && absY < 8) {
        /* Selecting. */
        /* Minimal directional change between the start and end interactions. */
        action = CarouselAction.SELECT;
      } else if (absY > absX) {
        /* Scrolling. */
        /* Vertical interaction is greater than horizontal interaction. */
        action = CarouselAction.SCROLL;
      } else {
        /* Swiping. */
        /* Determine direction of swipe. */
        const sign = Math.sign(dx);
        if (sign > 0) {
          /* Backwards. */
          /* Swipe has occurred left to right (x1 is greater than x0). */
          action = CarouselAction.SWIPE_BACKWARD;
        }
        if (sign < 0) {
          /* Forwards. */
          /* Swipe has occurred right to left (x1 is less than x0). */
          action = CarouselAction.SWIPE_FORWARD;
        }
      }
      return action;
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
    (increment: number, slowValue: boolean = false): void => {
      /* Increment slide index either way. */
      let newIndex = activeSlide + increment;
      if (newIndex < 0) {
        /* The action is SWIPE_BACKWARDS; */
        /* If the new index is negative, rotate to the end of the slide deck. */
        newIndex = lastSlideIndex;
      } else if (newIndex > lastSlideIndex) {
        /* The action is SWIPE_FORWARDS. */
        /* If the new index is greater than the number of possible slides, rotate to the start of the slide deck. */
        newIndex = 0;
      }
      /* Use appropriate transition speed. */
      setSlow(slowValue);
      /* Set new rotation index. */
      setActiveSlide(newIndex);
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
      /* Set new slide action. */
      const coords = getMouseCoords(mouseEvent);
      const action = calculateSwipeDirection(coords);
      setSlideAction(action);
    },
    [calculateSwipeDirection, getMouseCoords]
  );

  const onTouchEnd = useCallback(
    (touchEvent: TouchEvent): void => {
      /* Set new slide action. */
      const coords = getTouchCoords(touchEvent);
      const action = calculateSwipeDirection(coords);
      setSlideAction(action);
    },
    [calculateSwipeDirection, getTouchCoords]
  );

  const onTouchMove = useCallback(
    (touchEvent: TouchEvent): void => {
      const coords = getTouchCoords(touchEvent);
      const action = calculateSwipeDirection(coords);
      /* Prevent scrolling when slide action is not SCROLL. */
      if (action !== CarouselAction.SCROLL && touchEvent.cancelable) {
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
      sliderEl.removeEventListener("mousedown", onMouseDown);
      sliderEl.removeEventListener("mouseup", onMouseUp);
      sliderEl.removeEventListener("touchend", onTouchEnd);
      sliderEl.removeEventListener("touchmove", onTouchMove);
      sliderEl.removeEventListener("touchstart", onTouchStart);
    },
    [onMouseDown, onMouseUp, onTouchEnd, onTouchMove, onTouchStart]
  );

  const setTouchInteractions = useCallback(
    (sliderEl: HTMLDivElement): void => {
      sliderEl.addEventListener("mousedown", onMouseDown);
      sliderEl.addEventListener("mouseup", onMouseUp);
      sliderEl.addEventListener("touchend", onTouchEnd);
      sliderEl.addEventListener("touchmove", onTouchMove, {
        passive: false,
      });
      sliderEl.addEventListener("touchstart", onTouchStart);
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
    if (slideAction === CarouselAction.SWIPE_FORWARD) {
      swipeToSlide(1);
      setSlideAction(CarouselAction.NONE);
    } else if (slideAction === CarouselAction.SWIPE_BACKWARD) {
      swipeToSlide(-1);
      setSlideAction(CarouselAction.NONE);
    } else if (slideAction === CarouselAction.SELECT) {
      setSlideAction(CarouselAction.NONE);
    }
  }, [slideAction, swipeToSlide]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      swipeToSlide(1, true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [activeSlide, swipeToSlide]);

  return (
    <div className={carousel}>
      <CarouselArrow
        action={() => setSlideAction(CarouselAction.SWIPE_BACKWARD)}
        direction={CarouselAction.SWIPE_BACKWARD}
      />
      <div className={carouselBody}>
        <CarouselSlideshow
          activeSlide={activeSlide}
          slides={slides}
          slow={slow}
        />
        <CarouselBullets
          activeSlide={activeSlide}
          setSlow={setSlow}
          setActiveSlide={setActiveSlide}
          slides={slides}
        />
      </div>
      <CarouselArrow
        action={() => setSlideAction(CarouselAction.SWIPE_FORWARD)}
        direction={CarouselAction.SWIPE_FORWARD}
      />
    </div>
  );
};

export default Carousel;

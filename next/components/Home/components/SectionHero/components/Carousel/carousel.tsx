import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSectionsData } from "../../../../../../providers/sectionsData";
import { SectionCard } from "../../../../common/entities";
import { CarouselView } from "./carousel.styles";
import { CARDS } from "./common/constants";
import { CarouselAction, CAROUSEL_ACTION } from "./common/entities";
import { Bullets } from "./components/Bullets/bullets";
import { Cards } from "./components/Cards/cards";

interface EventCoordinates {
  x: number;
  y: number;
}

export const Carousel = (): JSX.Element => {
  const { carouselCards: cards } = useSectionsData();
  const initCoords = useRef<EventCoordinates>({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number>(-1);
  const [carouselAction, setCarouselAction] = useState<CarouselAction>(
    CAROUSEL_ACTION.NONE
  );
  const bullets = useMemo(() => getBullets(cards), [cards]);
  const lastCardIndex = cards.length - 1;

  const calculateSwipeDirection = useCallback(
    (coords: EventCoordinates): CarouselAction => {
      const { x: x0, y: y0 } = initCoords.current; // Start coordinates.
      const { x: x1, y: y1 } = coords; // End coordinates.

      /* Calculate the difference between mouse/touch start and end coordinates. */
      const dx = x1 - x0;
      const dy = y1 - y0;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      /* Calculate card action. */
      /* Start with neutral action. */
      let action = CAROUSEL_ACTION.NONE;
      if (absX < 8 && absY < 8) {
        /* Selecting. */
        /* Minimal directional change between the start and end interactions. */
        action = CAROUSEL_ACTION.SELECT;
      } else if (absY > absX) {
        /* Scrolling. */
        /* Vertical interaction is greater than horizontal interaction. */
        action = CAROUSEL_ACTION.SCROLL;
      } else {
        /* Swiping. */
        /* Determine direction of swipe. */
        const sign = Math.sign(dx);
        if (sign > 0) {
          /* Backwards. */
          /* Swipe has occurred left to right (x1 is greater than x0). */
          action = CAROUSEL_ACTION.SWIPE_BACKWARD;
        }
        if (sign < 0) {
          /* Forwards. */
          /* Swipe has occurred right to left (x1 is less than x0). */
          action = CAROUSEL_ACTION.SWIPE_FORWARD;
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
    (mouseEvent: MouseEvent): EventCoordinates => {
      const x = mouseEvent.clientX;
      const y = mouseEvent.clientY;
      return { x, y };
    },
    []
  );

  const getTouchCoords = useCallback(
    (touchEvent: TouchEvent): EventCoordinates => {
      const x = changedTouches(touchEvent).clientX;
      const y = changedTouches(touchEvent).clientY;
      return { x, y };
    },
    [changedTouches]
  );

  const swipeToCard = useCallback(
    (increment: number): void => {
      /* Increment card index either way. */
      let newIndex = activeCard + increment;
      if (newIndex < 0) {
        /* The action is SWIPE_BACKWARDS; */
        /* If the new index is negative, rotate to the end of the card deck. */
        newIndex = lastCardIndex;
      } else if (newIndex > lastCardIndex) {
        /* The action is SWIPE_FORWARDS. */
        /* If the new index is greater than the number of possible cards, rotate to the start of the card deck. */
        newIndex = 0;
      }
      /* Set new rotation index. */
      setActiveCard(newIndex);
    },
    [activeCard, lastCardIndex]
  );

  const onMouseDown = useCallback(
    (mouseEvent: MouseEvent): void => {
      initCoords.current = getMouseCoords(mouseEvent);
    },
    [getMouseCoords]
  );

  const onMouseUp = useCallback(
    (mouseEvent: MouseEvent): void => {
      /* Set new card action. */
      const coords = getMouseCoords(mouseEvent);
      const action = calculateSwipeDirection(coords);
      setCarouselAction(action);
    },
    [calculateSwipeDirection, getMouseCoords]
  );

  const onTouchEnd = useCallback(
    (touchEvent: TouchEvent): void => {
      /* Set new card action. */
      const coords = getTouchCoords(touchEvent);
      const action = calculateSwipeDirection(coords);
      setCarouselAction(action);
    },
    [calculateSwipeDirection, getTouchCoords]
  );

  const onTouchMove = useCallback(
    (touchEvent: TouchEvent): void => {
      const coords = getTouchCoords(touchEvent);
      const action = calculateSwipeDirection(coords);
      /* Prevent scrolling when card action is not SCROLL. */
      if (action !== CAROUSEL_ACTION.SCROLL && touchEvent.cancelable) {
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
    (cardsEl: HTMLDivElement): void => {
      cardsEl.removeEventListener("mousedown", onMouseDown);
      cardsEl.removeEventListener("mouseup", onMouseUp);
      cardsEl.removeEventListener("touchend", onTouchEnd);
      cardsEl.removeEventListener("touchmove", onTouchMove);
      cardsEl.removeEventListener("touchstart", onTouchStart);
    },
    [onMouseDown, onMouseUp, onTouchEnd, onTouchMove, onTouchStart]
  );

  const setTouchInteractions = useCallback(
    (cardsEl: HTMLDivElement): void => {
      cardsEl.addEventListener("mousedown", onMouseDown);
      cardsEl.addEventListener("mouseup", onMouseUp);
      cardsEl.addEventListener("touchend", onTouchEnd);
      cardsEl.addEventListener("touchmove", onTouchMove, {
        passive: false,
      });
      cardsEl.addEventListener("touchstart", onTouchStart);
    },
    [onMouseDown, onMouseUp, onTouchEnd, onTouchMove, onTouchStart]
  );

  useEffect(() => {
    setActiveCard(Math.floor(Math.random() * cards.length));
  }, [cards]);

  /* useEffect - componentDidMount. */
  useEffect(() => {
    /* Set touch interactions. */
    /* Grab the card container element. */
    const cardsEl = document.getElementById(CARDS) as HTMLDivElement;
    setTouchInteractions(cardsEl);

    return () => {
      /* Remove touch interactions. */
      removeTouchInteractions(cardsEl);
    };
  }, [removeTouchInteractions, setTouchInteractions]);

  useEffect(() => {
    if (carouselAction === CAROUSEL_ACTION.SWIPE_FORWARD) {
      swipeToCard(1);
      setCarouselAction(CAROUSEL_ACTION.NONE);
    } else if (carouselAction === CAROUSEL_ACTION.SWIPE_BACKWARD) {
      swipeToCard(-1);
      setCarouselAction(CAROUSEL_ACTION.NONE);
    } else if (carouselAction === CAROUSEL_ACTION.SELECT) {
      setCarouselAction(CAROUSEL_ACTION.NONE);
    }
  }, [carouselAction, swipeToCard]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      swipeToCard(1);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [activeCard, swipeToCard]);

  return (
    <CarouselView>
      <Cards
        activeCard={activeCard}
        cards={cards}
        setCarouselAction={setCarouselAction}
      />
      <Bullets
        activeCard={activeCard}
        bullets={bullets}
        setActiveCard={setActiveCard}
      />
    </CarouselView>
  );
};

/**
 * Returns array of card positions.
 * @param carouselCards - Carousel cards.
 * @returns card positions.
 */
function getBullets(carouselCards: SectionCard[]): number[] {
  return [...Array(carouselCards.length).keys()];
}

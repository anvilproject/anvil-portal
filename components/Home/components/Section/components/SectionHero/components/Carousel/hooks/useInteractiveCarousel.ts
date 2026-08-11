import { useMemo } from "react";
import { useSectionsData } from "../../../../../../../../../providers/sectionsData";
import { SectionCard } from "../../../../../../../common/entities";
import {
  UseSwipeInteraction,
  useSwipeInteraction,
} from "../../../../../../../hooks/useSwipeInteraction/useSwipeInteraction";
import { AUTO_ROTATE, AUTO_ROTATE_DELAY } from "../common/constants";

export interface UseInteractiveCarousel {
  activeIndex: UseSwipeInteraction["activeIndex"];
  interactiveAction?: UseSwipeInteraction["interactiveAction"];
  interactiveCards: SectionCard[];
  interactiveIndexes: number[];
  onSetActiveIndex: UseSwipeInteraction["onSetActiveIndex"];
  onSetSwipeAction: UseSwipeInteraction["onSetSwipeAction"];
}

/**
 * Facilitates interaction capabilities for the carousel.
 * @returns carousel cards, interactive indexes, and interactive actions.
 */
export function useInteractiveCarousel(): UseInteractiveCarousel {
  // Raw carousel cards.
  const { carouselCards } = useSectionsData();
  // Get the interactive indexes.
  const interactiveIndexes = useMemo(
    () => buildInteractiveIndexes(carouselCards),
    [carouselCards]
  );
  // Get the active index and interactive actions; a swipe delay of 0 disables auto-rotation.
  const swipeInteraction = useSwipeInteraction(
    interactiveIndexes.length,
    true,
    AUTO_ROTATE ? AUTO_ROTATE_DELAY : 0
  );
  return {
    interactiveCards: carouselCards,
    interactiveIndexes,
    ...swipeInteraction,
  };
}

/**
 * Returns array of interactive indexes.
 * @param cards - Cards.
 * @returns a list of indexes that are interactive.
 */
function buildInteractiveIndexes(cards: SectionCard[]): number[] {
  return [...Array(cards.length).keys()];
}

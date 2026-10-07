import { useMemo, useSyncExternalStore } from "react";
import { useSectionsData } from "../../../../../../../../../providers/sectionsData";
import { SectionCard } from "../../../../../../../common/entities";
import { excludeEndedCards } from "../../../../../../../common/utils";
import {
  UseSwipeInteraction,
  useSwipeInteraction,
} from "../../../../../../../hooks/useSwipeInteraction/useSwipeInteraction";
import { AUTO_ROTATE, AUTO_ROTATE_DELAY } from "../common/constants";
import {
  getClientSnapshot,
  getServerSnapshot,
  subscribeNoop,
} from "../common/utils";

export interface UseInteractiveCarousel {
  activeIndex: UseSwipeInteraction["activeIndex"];
  interactiveAction?: UseSwipeInteraction["interactiveAction"];
  interactiveCards: SectionCard[];
  interactiveIndexes: number[];
  onSetActiveIndex: UseSwipeInteraction["onSetActiveIndex"];
  onSetSwipeAction: UseSwipeInteraction["onSetSwipeAction"];
}

/**
 * Facilitates interaction capabilities for the carousel. Once hydrated, cards
 * whose end date has passed are excluded.
 * @returns carousel cards, interactive indexes, and interactive actions.
 */
export function useInteractiveCarousel(): UseInteractiveCarousel {
  // Raw carousel cards.
  const { carouselCards } = useSectionsData();
  // Once hydrated, drop cards that ended after the site was built; waiting
  // until then keeps the first render identical to the static HTML.
  const isClient = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  );
  const cards = useMemo(
    () => (isClient ? excludeEndedCards(carouselCards) : carouselCards),
    [carouselCards, isClient]
  );
  // Get the interactive indexes.
  const interactiveIndexes = useMemo(
    () => buildInteractiveIndexes(cards),
    [cards]
  );
  // Get the active index and interactive actions; a swipe delay of 0 disables auto-rotation.
  const swipeInteraction = useSwipeInteraction(
    interactiveIndexes.length,
    true,
    AUTO_ROTATE ? AUTO_ROTATE_DELAY : 0
  );
  return {
    interactiveCards: cards,
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

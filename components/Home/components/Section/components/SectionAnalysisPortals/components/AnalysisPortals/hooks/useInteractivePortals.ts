import { RefObject, useEffect, useMemo } from "react";
import { useSectionsData } from "../../../../../../../../../providers/sectionsData";
import { SectionCard } from "../../../../../../../common/entities";
import {
  UseSwipeInteraction,
  useSwipeInteraction,
} from "../../../../../../../hooks/useSwipeInteraction/useSwipeInteraction";
import { ROWS } from "../common/constants";
import { useIntersectionObserver } from "./useIntersectionObserver";

export interface UseInteractivePortals {
  activeIndex: UseSwipeInteraction["activeIndex"];
  interactionEnabled: boolean;
  interactiveAction?: UseSwipeInteraction["interactiveAction"];
  interactiveCards: SectionCard[];
  interactiveIndexes: number[];
  onSetActiveIndex: UseSwipeInteraction["onSetActiveIndex"];
}

/**
 * Facilitates interaction capabilities for portal cards, including swipe-able interactions based on viewport intersection.
 * @param ref -  Ref pointing to the element that the intersection observer monitors.
 * @returns portal cards ordered by the active index, interactive indexes, and interactive actions.
 */
export function useInteractivePortals(
  ref: RefObject<HTMLElement | null>
): UseInteractivePortals {
  // Intersection observer for portal cards intersecting the viewport.
  const { isIntersecting } = useIntersectionObserver(ref);
  // Raw portal cards.
  const { analysisPortalCards } = useSectionsData();
  // Determine if the cards are swipe-able.
  const swipeEnabled = !isIntersecting;
  // Get the interactive indexes.
  const interactiveIndexes = useMemo(
    () => buildInteractiveIndexes(analysisPortalCards),
    [analysisPortalCards]
  );
  // Get the active index and interactive actions.
  const swipeInteraction = useSwipeInteraction(
    interactiveIndexes.length,
    swipeEnabled
  );
  const { activeIndex, onSetActiveIndex } = swipeInteraction;
  // Rotate the cards based on the active index.
  const interactiveCards = useMemo(
    () => rotateCards(analysisPortalCards, activeIndex, swipeEnabled),
    [activeIndex, analysisPortalCards, swipeEnabled]
  );

  // Reset the active index when swipe-ability changes.
  useEffect(() => {
    onSetActiveIndex(0);
  }, [swipeEnabled, onSetActiveIndex]);

  return {
    interactionEnabled: swipeEnabled,
    interactiveCards,
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
  const indexCount = Math.ceil(cards.length / ROWS);
  return [...Array(indexCount).keys()];
}

/**
 * Returns cards organised by row position.
 * @param cards - Cards.
 * @returns cards organised by row position.
 */
const organiseCardsByRowPosition = (cards: SectionCard[]): SectionCard[][] => {
  // Calculate the maximum number of cards per row.
  const cardsPerRow = Math.ceil(cards.length / ROWS);
  // Return the cards organised by row position.
  return [...cards].reduce((acc, card, cardIndex) => {
    const rowIndex = Math.floor(cardIndex / cardsPerRow);
    const row = acc[rowIndex] || [];
    row.push(card);
    acc[rowIndex] = row;
    return acc;
  }, [] as SectionCard[][]);
};

/**
 * Returns cards rotated into the correct position based on the active index.
 * Each row of cards handles its own rotation.
 * @param cards - Cards.
 * @param activeIndex - Active index.
 * @param swipeEnabled - Boolean indicating cards are swipe-able.
 * @returns rotated cards.
 */
function rotateCards(
  cards: SectionCard[],
  activeIndex: number,
  swipeEnabled: boolean
): SectionCard[] {
  if (!swipeEnabled) {
    return cards;
  }
  const organisedCards = organiseCardsByRowPosition(cards);
  return organisedCards.reduce((acc, row) => {
    const rotatedRow: SectionCard[] = [...row];
    for (let i = 0; i < activeIndex; i++) {
      const firstCard = rotatedRow.shift() as SectionCard;
      rotatedRow.push(firstCard);
    }
    return acc.concat(rotatedRow);
  }, [] as SectionCard[]);
}

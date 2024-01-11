import {
  CARD_OFFSET_Y,
  CARD_SCALE_X,
  MAX_CARD_WIDTH,
  MAX_DECK_SIZE,
} from "./constants";

/**
 * Returns the carousel card's y-axis offset.
 * @param cardPosition - Card position.
 * @returns y-axis offset.
 */
export function getCardOffsetY(cardPosition: number): string {
  return `${(MAX_DECK_SIZE - cardPosition) * CARD_OFFSET_Y}px`;
}

/**
 * Returns the carousel card's position in the deck.
 * @param index - Card index.
 * @param activeCard - Active card index.
 * @param lastIndex - Last card index.
 * @returns card position (position zero to deck size).
 */
export function getCardPosition(
  index: number,
  activeCard: number,
  lastIndex: number
): number {
  const order = index - activeCard;
  if (order >= 0) return order;
  // If the order is negative, stack the card to the end of the deck.
  // Grab the last (positive) position in the deck and add the absolute value of the order.
  return lastIndex - activeCard + Math.abs(order);
}

/**
 * Returns the carousel card's x-axis scale.
 * @param cardPosition - Card position.
 * @returns card x-axis scale.
 */
export function getCardScaleX(cardPosition: number): string {
  if (cardPosition === 0) return "scaleX(1)"; // The active card is scaled to 1.
  return `scaleX(${
    (MAX_CARD_WIDTH - cardPosition * CARD_SCALE_X) / MAX_CARD_WIDTH
  })`;
}

/**
 * Returns the carousel card's z-index.
 * @param cardPosition - Card position.
 * @returns card z-index.
 */
export function getCardZIndex(cardPosition: number): number {
  return MAX_DECK_SIZE - cardPosition;
}

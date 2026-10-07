import { SectionCard, VISIBILITY_MODE } from "./entities";

/**
 * Returns the cards whose end date (if any) has not passed.
 * @param cards - Cards.
 * @returns cards that have not ended.
 */
export function excludeEndedCards(cards: SectionCard[]): SectionCard[] {
  return cards.filter((card) => !hasEnded(card.endDate));
}

/**
 * Returns true if the given end date has passed everywhere. The end date is
 * inclusive and measured "anywhere on Earth" (UTC-12): an item ending
 * "2027-02-01" is active until that day is over in every timezone, so the build
 * server and every visitor agree and it never ends early for anyone. Throws if
 * the end date can't be read, so a typo fails the build.
 * @param endDate - End date, as "YYYY-MM-DD".
 * @returns true if the end date is defined and has passed.
 */
export function hasEnded(endDate?: string): boolean {
  if (!endDate) return false;
  const [year, month, day] = endDate.split("-").map(Number);
  // Midnight starting the following day at UTC-12 is 12:00 UTC that day.
  const end = Date.UTC(year, month - 1, day + 1, 12);
  if (Number.isNaN(end)) {
    throw new Error(`Invalid end date "${endDate}"; expected "YYYY-MM-DD".`);
  }
  return Date.now() >= end;
}

/**
 * Resets visibility mode.
 * @param isExpanded - Whether the section should be expanded (default).
 * @returns visibility mode.
 */
export function resetVisibilityMode(isExpanded: boolean): VISIBILITY_MODE {
  return isExpanded ? VISIBILITY_MODE.EXPANDED : VISIBILITY_MODE.COLLAPSED;
}

/**
 * Updates visibility mode; toggles mode from expanded to collapsed and vice versa.
 * @param currentMode - Current visibility mode.
 * @returns visibility mode.
 */
export function updateVisibilityMode(
  currentMode: VISIBILITY_MODE
): VISIBILITY_MODE {
  return currentMode === VISIBILITY_MODE.COLLAPSED
    ? VISIBILITY_MODE.EXPANDED
    : VISIBILITY_MODE.COLLAPSED;
}

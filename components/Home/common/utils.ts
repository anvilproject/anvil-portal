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
 * the end date is not a valid "YYYY-MM-DD" date, so a typo fails the build.
 * @param endDate - End date, as "YYYY-MM-DD".
 * @returns true if the end date is defined and has passed.
 */
export function hasEnded(endDate?: string): boolean {
  if (!endDate) return false;
  const [year, month, day] = parseEndDate(endDate);
  // Midnight starting the following day at UTC-12 is 12:00 UTC that day.
  return Date.now() >= Date.UTC(year, month - 1, day + 1, 12);
}

/**
 * Parses an end date written as "YYYY-MM-DD". Years must be 1000-9999, since
 * Date.UTC maps years 0-99 to 1900-1999.
 * @param endDate - End date.
 * @returns year, month (1-12), and day.
 */
function parseEndDate(endDate: string): [number, number, number] {
  const match = /^([1-9]\d{3})-(\d{2})-(\d{2})$/.exec(endDate);
  if (match) {
    const [year, month, day] = match.slice(1).map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    // Rejects impossible dates such as "2027-02-31", which Date rolls over.
    if (date.getUTCMonth() === month - 1 && date.getUTCDate() === day) {
      return [year, month, day];
    }
  }
  throw new Error(`Invalid end date "${endDate}"; expected "YYYY-MM-DD".`);
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

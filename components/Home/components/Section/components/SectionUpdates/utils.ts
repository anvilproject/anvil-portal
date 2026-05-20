import { UpdateCard } from "./common/entities";
import { MAX_UPDATE_CARDS, UPDATE_VIEW } from "./constants";

/**
 * Returns the cards to display in the updates section. News always shows the
 * most recent items (0–3, no placeholder). Events filter to upcoming items
 * and fall back to a single placeholder card linking to the events archive
 * when none are available.
 * @param view - Current update view (news or events).
 * @param newsCards - All news cards.
 * @param eventCards - All event cards.
 * @returns Cards to display.
 */
export function getDisplayCards(
  view: UPDATE_VIEW,
  newsCards: UpdateCard[],
  eventCards: UpdateCard[]
): UpdateCard[] {
  if (view === UPDATE_VIEW.NEWS) {
    return newsCards.slice(0, MAX_UPDATE_CARDS);
  }

  const cards = eventCards
    .filter(filterUpcomingEvent)
    .reverse()
    .slice(0, MAX_UPDATE_CARDS);

  if (cards.length === 0) {
    return [
      {
        link: { label: null, url: "/events" },
        text: "Browse all AnVIL events.",
        title: "No upcoming events",
      },
    ];
  }

  return cards;
}

/**
 * Returns true if the card has a future date.
 * @param card - Card.
 * @returns true if the card has a future date.
 */
function filterUpcomingEvent(card: UpdateCard): boolean {
  if (!card.date) return false;
  return new Date(card.date) >= new Date();
}

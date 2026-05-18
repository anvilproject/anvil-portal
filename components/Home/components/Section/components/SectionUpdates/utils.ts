import { UpdateCard } from "./common/entities";
import { MAX_UPDATE_CARDS, UPDATE_VIEW } from "./constants";

const PLACEHOLDER_CARD: Record<UPDATE_VIEW, UpdateCard> = {
  [UPDATE_VIEW.EVENTS]: {
    link: { label: null, url: "/events" },
    text: "Browse all AnVIL events.",
    title: "No upcoming events",
  },
  [UPDATE_VIEW.NEWS]: {
    link: { label: null, url: "/news" },
    text: "Browse all AnVIL news.",
    title: "No recent news",
  },
};

/**
 * Returns the cards to display in the updates section. When the filter yields
 * no results, a single placeholder card linking to the full archive is
 * returned in its place.
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
  const cards =
    view === UPDATE_VIEW.NEWS
      ? newsCards.slice(0, MAX_UPDATE_CARDS)
      : eventCards
          .filter(filterUpcomingEvent)
          .reverse()
          .slice(0, MAX_UPDATE_CARDS);
  if (cards.length === 0) return [PLACEHOLDER_CARD[view]];
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

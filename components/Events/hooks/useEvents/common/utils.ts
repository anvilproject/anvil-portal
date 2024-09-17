import { FrontmatterEvent } from "../../../../../content/entities";
import { EVENTS_VIEW } from "./entities";

/**
 * Returns boolean indicating event filtered based on the events view "upcoming" or "past".
 * @param eventTimestamp - Event timestamp.
 * @param timestamp - Timestamp.
 * @param view - Events view.
 * @returns event should be filtered, based on the events view "upcoming" or "past".
 */
function filterEvent(
  eventTimestamp: number | undefined,
  timestamp: number,
  view: EVENTS_VIEW
): boolean {
  if (!eventTimestamp) return false;
  return view === EVENTS_VIEW.UPCOMING
    ? eventTimestamp >= timestamp
    : eventTimestamp < timestamp;
}

/**
 * Filters events based on the events view.
 * @param events - Events.
 * @param view - Events view.
 * @returns filtered events.
 */
export function filterEvents(
  events: FrontmatterEvent[],
  view: EVENTS_VIEW
): FrontmatterEvent[] {
  const timestamp = Date.now();
  return reverseEvents(events, view).filter(({ timestamp: eventTimestamp }) =>
    filterEvent(eventTimestamp, timestamp, view)
  );
}

/**
 * Returns the events in reverse order, if the events view is "upcoming".
 * @param events - Events.
 * @param view - Events view.
 * @returns events in reverse order, if the events view is "upcoming".
 */
export function reverseEvents(
  events: FrontmatterEvent[],
  view: EVENTS_VIEW
): FrontmatterEvent[] {
  if (view === EVENTS_VIEW.UPCOMING) {
    return [...events].reverse();
  }
  return [...events];
}

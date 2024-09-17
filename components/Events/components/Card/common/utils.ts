import { FrontmatterEvent } from "../../../../../content/entities";

export function getEventOverline(event: FrontmatterEvent): string[] {
  const { eventType, location } = event;
  const overline = [];
  if (eventType) overline.push(eventType);
  if (location) overline.push(location);
  return overline;
}

/**
 * Returns the event title "conference - title".
 * @param event - Event.
 * @returns event title.
 */
export function getEventTitle(event: FrontmatterEvent): string {
  const { conference, title } = event;
  return `${conference} - ${title}`;
}

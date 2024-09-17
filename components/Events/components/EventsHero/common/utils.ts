import { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { FrontmatterEvent, Hashtag } from "../../../../../content/entities";
import { ROUTES } from "../../../../../routes/constants";

export function getEventBreadcrumbs(event: FrontmatterEvent): Breadcrumb[] {
  const { title } = event;
  return [
    { path: ROUTES.EVENTS, text: "Events" },
    { path: "", text: title },
  ];
}

/**
 * Returns the event Twitter URL.
 * @param hashtag - Event hashtag.
 * @returns event Twitter URL.
 */
export function getEventTwitterURL(hashtag?: Hashtag): string | undefined {
  if (!hashtag) return;
  return `https://twitter.com/hashtag/${hashtag.substring(1)}`;
}

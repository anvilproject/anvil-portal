import { useCallback, useMemo, useState } from "react";
import { FrontmatterEvent } from "../../../../content/entities";
import { EVENTS_VIEW } from "./common/entities";
import { filterEvents } from "./common/utils";

export interface UseEvents {
  events: FrontmatterEvent[];
  onView: (view: EVENTS_VIEW) => void;
  view: EVENTS_VIEW;
}

export const useEvents = (frontmatters: FrontmatterEvent[]): UseEvents => {
  const [view, setView] = useState<EVENTS_VIEW>(EVENTS_VIEW.UPCOMING);
  const events = useMemo(
    () => filterEvents(frontmatters, view),
    [frontmatters, view]
  );

  // Callback fired when selected tab value changes.
  const onView = useCallback((view: EVENTS_VIEW): void => {
    setView(view);
  }, []);

  return { events, onView, view };
};

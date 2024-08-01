import { Card as DXCard } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Tabs } from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";
import React from "react";
import { FrontmatterEvent } from "../../content/entities";
import { EVENTS_VIEW_TABS } from "./common/constants";
import { Card } from "./components/Card/card";
import { EventsView } from "./events.styles";
import { useEvents } from "./hooks/useEvents/useEvents";

interface EventsProps {
  events: FrontmatterEvent[];
}

export const Events = ({ events }: EventsProps): JSX.Element => {
  const { events: filteredEvents, onView, view } = useEvents(events);
  return (
    <EventsView>
      <Tabs onTabChange={onView} tabs={EVENTS_VIEW_TABS} value={view} />
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event, i) => <Card key={i} event={event} />)
      ) : (
        <DXCard Paper={FluidPaper} text="Currently, we have no events." />
      )}
    </EventsView>
  );
};

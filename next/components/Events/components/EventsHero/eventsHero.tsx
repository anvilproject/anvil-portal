import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { FrontmatterEvent } from "../../../../content/entities";
import { ROUTES } from "../../../../routes/constants";
import { Heading } from "../../../common/Typography/components/Heading/heading";
import { EventHero as Hero, SubHeader } from "./eventsHero.styles";

export const EventsHero = ({ ...props }: FrontmatterEvent): JSX.Element => {
  const { eventType, location, sessions, title } = props;
  return (
    <Hero>
      <Breadcrumbs
        breadcrumbs={[
          { path: ROUTES.EVENTS, text: "Events" },
          { path: "", text: title },
        ]}
      />
      <Heading headingValue={title} />
      <SubHeader>
        {eventType && <div>{eventType}</div>}
        {sessions.length > 0 &&
          sessions.map(({ sessionStart }, i) => (
            <div key={i}>{sessionStart}</div>
          ))}
        {location && <div>{location}</div>}
      </SubHeader>
    </Hero>
  );
};

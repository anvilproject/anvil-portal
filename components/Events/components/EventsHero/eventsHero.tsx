import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { JSX } from "react";
import { FrontmatterEvent } from "../../../../content/entities";
import { Heading } from "../../../common/Typography/components/Heading/heading";
import { getEventTitle } from "../Card/common/utils";
import { getEventBreadcrumbs, getEventTwitterURL } from "./common/utils";
import { EventHero as Hero, SubHeader } from "./eventsHero.styles";

export const EventsHero = ({ ...props }: FrontmatterEvent): JSX.Element => {
  const { eventType, formattedSessions: sessions, hashtag, location } = props;
  const twitterUrl = getEventTwitterURL(hashtag);
  return (
    <Hero>
      <Breadcrumbs breadcrumbs={getEventBreadcrumbs(props)} />
      <Heading headingValue={getEventTitle(props)} />
      <SubHeader>
        {eventType && <div>{eventType}</div>}
        {sessions && sessions.map((session, i) => <div key={i}>{session}</div>)}
        {location && <div>{location}</div>}
        {twitterUrl && <Link label={hashtag} url={twitterUrl} />}
      </SubHeader>
    </Hero>
  );
};

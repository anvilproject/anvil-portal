/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - events component.
 * Use of this component within markdown is possible.
 * Use the tag <events filter='{"fronmatterName": "value"}'></events> but ensure it is closed.
 *
 * The prop "featured" is optional and returns featured events.
 *
 * The prop "filter" is a JSON string and is optional. It may comprise of any of the following keys from events frontmatter:
 * - "conference"
 * - "eventType"
 *
 * The prop "past" is optional and will return past events. Omitting this prop will return upcoming events.
 *
 * An example of the filter prop, finding all upcoming events with conferences value equal to "ASHG 2020" would be:
 * <events filter='{"conference":"ASHG 2020"}'></events>
 */

// Core dependencies
import React from "react";

// App dependencies
import { ScoopEventStaticQuery } from "../../hooks/scoop-event-query";
import Scoop from "../scoops/scoop";
import * as ScoopsService from "../../utils/scoops.service";

// Styles
import * as compStyles from "./events.module.css";

class Events extends React.Component {
  render() {
    const { featuredOnly, scoops, type } = this.props;
    return (
      <Scoop
        className={compStyles.event}
        noEvents={compStyles.noEvents}
        featuredOnly={featuredOnly}
        scoops={scoops}
        type={type}
      />
    );
  }
}

export default (props) => {
  const { featured, filter, past } = props;
  const featuredOnly = featured || featured === "";
  const pastEvent = past === "";
  const scoops = ScoopEventStaticQuery();
  const scoopsByDate = ScoopsService.filterScoopsByDate(scoops, pastEvent);
  const scoopsByFilter = ScoopsService.filterScoopsByFrontmatter(
    scoopsByDate,
    filter
  );
  const type = pastEvent ? "past events" : "upcoming events";

  return (
    <Events featuredOnly={featuredOnly} scoops={scoopsByFilter} type={type} />
  );
};

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - events component.
 * Use of this component within markdown is possible.
 * Use the tag <events filter='{"fronmatterName": "value"}'></events> but ensure it is closed.
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
import {EventsStaticQuery} from "../../hooks/events-query";
import Scoop from "../scoops/scoop";
import * as ScoopsService from "../../utils/scoops.service";

// Styles
import compStyles from "./events.module.css";

class Events extends React.Component {

    render() {
        const {scoops, type} = this.props;
        return (
            <Scoop className={compStyles.event} noEvents={compStyles.noEvents} featuredOnly={false} scoops={scoops} type={type}/>
        );
    }
}

export default (props) => {

    const filter = props.filter;
    const events = EventsStaticQuery();
    const eventsScoops = ScoopsService.getScoops(events);
    const past = props && props.past === "";
    const scoopsByDate = ScoopsService.filterScoopsByDate(eventsScoops, past);
    const scoopsByFilter = ScoopsService.filterScoopsByFrontmatter(scoopsByDate, filter);
    const type = past ? "past events" : "upcoming events";

    return (
        <Events scoops={scoopsByFilter} type={type}/>
    )
}

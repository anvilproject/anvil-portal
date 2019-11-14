/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - events page.
 */

// Core dependencies
import queryString from "query-string";
import React from "react";

// App dependencies
import Layout from "../components/layout";
import Scoops from "../components/scoops/scoops";
import {eventsStaticQuery} from "../hooks/eventsQuery";
import * as ScoopsService from "../utils/scoops.service";

// Styles
import compStyles from "./events.module.css";

class Events extends React.Component {

    render() {
        const {docPath, intro, scoops, type} = this.props;
        return (
            <Layout docPath={docPath}>
                <Scoops className={compStyles.event} intro={intro} scoops={scoops} type={type}/>
            </Layout>
        );
    }
}

export default (props) => {

    const docPath = props && props.location ? props.location.pathname : "";
    const showPastEvents = queryString.parse(props.location.search).past;
    const events = eventsStaticQuery();
    const intro = ScoopsService.getIntroduction(events);
    const eventsScoops = ScoopsService.getScoops(events);
    const scoopsByDate = ScoopsService.filterScoopsByDate(eventsScoops, showPastEvents);
    const type = showPastEvents ? "past events" : "upcoming events";

    return (
        <Events docPath={docPath} intro={intro} past={showPastEvents} scoops={scoopsByDate} type={type}/>
    )
}

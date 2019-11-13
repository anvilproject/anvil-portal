/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - events page.
 */

// Core dependencies
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
        const {intro, scoops} = this.props;
        return (
            <Layout>
                <Scoops className={compStyles.event} intro={intro} scoops={scoops} type="events"/>
            </Layout>
        );
    }
}

export default () => {

    const eventsScoops = ScoopsService.getScoops(eventsStaticQuery());
    const intro = ScoopsService.getIntroduction(eventsStaticQuery());

    return (
        <Events intro={intro} scoops={eventsScoops}/>
    )
}

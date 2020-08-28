/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - event hero component.
 */

// Core dependencies
import React from "react";

// App dependencies
import FrontmatterContext from "../context/frontmatter-context";
import * as AnchorService from "../../utils/anchor.service";

// Styles
import compStyles from "./event-hero.module.css";

class EventHero extends React.Component {

    static contextType = FrontmatterContext;

    render() {
        const frontmatter = this.context,
            {conference, eventType, location, sessionsDisplay, subTitle, title} = frontmatter;
        const identifier = AnchorService.buildAnchorIdentifier(title);
        return (
            <div className={compStyles.eventHero}>
                <h6>{conference}</h6>
                <h1 id={identifier}>{title}</h1>
                <h5>{eventType}</h5>
                {sessionsDisplay ? sessionsDisplay.map((session, s) => <h5 key={s}>{session}</h5>) : null}
                <h5>{location}</h5>
                <hr/>
                {subTitle ? <h2>{subTitle}</h2> : null}
            </div>
        );
    }
}

export default EventHero;

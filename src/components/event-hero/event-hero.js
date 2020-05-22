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
            {conference, date, eventType, location, subTitle, time, title} = frontmatter;
        const identifier = AnchorService.buildAnchorIdentifier(title);
        return (
            <div className={compStyles.eventHero}>
                <h6>{conference}</h6>
                <h1 id={identifier}>{title}</h1>
                <h5>{eventType}</h5>
                <h5>{date}</h5>
                <h5>{time ? <span>{time}, </span> : null}<span>{location}</span></h5>
                <hr/>
                {subTitle ? <h2>{subTitle}</h2> : null}
            </div>
        );
    }
}

export default EventHero;

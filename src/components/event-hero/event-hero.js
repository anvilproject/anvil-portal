/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - event hero component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextFrontmatter from "../context-frontmatter/context-frontmatter";
import * as AnchorService from "../../utils/anchor.service";

// Styles
import * as compStyles from "./event-hero.module.css";

function EventHero() {
  const { conference, eventType, location, sessionsDisplay, subTitle, title } =
    useContext(ContextFrontmatter);
  const identifier = AnchorService.buildAnchorIdentifier(title);

  return (
    <div className={compStyles.eventHero}>
      <h6>{conference}</h6>
      <h1 id={identifier}>{title}</h1>
      <h5>{eventType}</h5>
      {sessionsDisplay
        ? sessionsDisplay.map((session, s) => <h5 key={s}>{session}</h5>)
        : null}
      <h5>{location}</h5>
      <hr />
      {subTitle ? <h2>{subTitle}</h2> : null}
    </div>
  );
}

export default EventHero;

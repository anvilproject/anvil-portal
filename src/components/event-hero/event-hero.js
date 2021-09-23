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
  const {
    conference,
    eventType,
    hashtag,
    location,
    sessionsDisplay,
    subTitle,
    title,
  } = useContext(ContextFrontmatter);
  const identifier = AnchorService.buildAnchorIdentifier(title);
  let tag = hashtag;
  let twitterHashUrl = "";
  if (hashtag) {
    if (hashtag.startsWith("#")) {
      tag = hashtag.substring(1);
    }
    twitterHashUrl = `https://twitter.com/hashtag/${tag}`;
  }

  return (
    <div className={compStyles.eventHero}>
      <h6>{conference}</h6>
      <h1 id={identifier}>{title}</h1>
      <h5>{eventType}</h5>
      {sessionsDisplay
        ? sessionsDisplay.map((session, s) => <h5 key={s}>{session}</h5>)
        : null}
      {location ? <h5>{location}</h5> : null}
      {hashtag ? (
        <h5>
          <a href={twitterHashUrl} rel={"noopener"} target={"_blank"}>
            {hashtag}
          </a>
        </h5>
      ) : null}
      <hr />
      {subTitle ? <h2>{subTitle}</h2> : null}
    </div>
  );
}

export default EventHero;

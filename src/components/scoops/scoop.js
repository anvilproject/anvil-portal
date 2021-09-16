/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - scoop component, displays lists of either news or events.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import BubbleDate from "../bubble-date/bubble-date";
import ListItem from "../list-item/list-item";
import ListItemContent from "../list-item/list-item-content";
import ListItemIcon from "../list-item/list-item-icon";
import Overline from "../overline/overline";
import * as ScoopsService from "../../utils/scoops.service";

// Styles
import * as contentStyles from "../markdown/markdown.module.css";
import * as compStyles from "./scoop.module.css";

class Scoop extends React.Component {
  getScoops = () => {
    const { featuredOnly, scoops } = this.props;

    if (!featuredOnly) {
      // Returns all
      return scoops;
    }

    // Return only the featured scoops
    return scoops.filter((scoop) => scoop.frontmatter.featured === true);
  };

  render() {
    const { className, noEvents, scoops, type } = this.props;

    // Determine type of scoop - catch "events" for home page, or "upcoming events" and "past events" for events list
    const scoopTypeEvents = /events/.test(type);
    const pastEvents = /past/.test(type);

    const Headline = (props) => {
      const { scoop } = props,
        { fields, frontmatter } = scoop,
        { conference, date, dateBubble, description, eventType, title } =
          frontmatter,
        { slug } = fields;

      // Validate and format dates for display
      const dateNews = ScoopsService.validateDate(date);

      return (
        <div
          className={classNames(
            contentStyles.content,
            compStyles.scoop,
            className
          )}
        >
          <ListItem linkTo={slug}>
            {scoopTypeEvents ? (
              <>
                <ListItemIcon>
                  <BubbleDate dateBubble={dateBubble} disabled={pastEvents} />
                </ListItemIcon>
                <ListItemContent>
                  <Overline>
                    <span>{conference}</span>
                    <span>{eventType}</span>
                  </Overline>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </ListItemContent>
              </>
            ) : (
              <ListItemContent>
                <h3>{title}</h3>
                <Overline>
                  <span>Posted: {dateNews}</span>
                </Overline>
                <p>{description}</p>
              </ListItemContent>
            )}
          </ListItem>
        </div>
      );
    };

    return scoops.length ? (
      this.getScoops().map((scoop, i) => <Headline key={i} scoop={scoop} />)
    ) : (
      <p className={classNames(compStyles.scoopless, noEvents)}>
        Currently, we have no {type}.
      </p>
    );
  }
}

export default Scoop;

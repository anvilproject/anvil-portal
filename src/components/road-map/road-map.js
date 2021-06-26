/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL release roadmap component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { RoadMapStaticQuery } from "../../hooks/road-map-query";

// Styles
import compStyles from "./road-map.module.css";

let classNames = require("classnames");

class RoadMap extends React.Component {
  /**
   * Returns true if quarter should be displayed.
   *
   * @param quarter
   * @returns {boolean}
   */
  showQuarter = quarter => {
    const { display } = quarter;

    if (!display) {
      return false;
    }

    const { tools, platforms } = display;

    return tools || platforms;
  };

  /**
   * Render quarters, bubbles and key.
   */
  render() {
    const { roadMap } = this.props;

    const Bubble = props => {
      const { className, item } = props,
        { link, name } = item;

      return (
        <a
          href={link}
          className={classNames(compStyles.bubble, className)}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {name}
        </a>
      );
    };

    const Key = () => {
      return (
        <div className={compStyles.key}>
          <span className={compStyles.tool}>Tools</span>
          <span className={compStyles.platform}>Platforms</span>
        </div>
      );
    };

    const Quarter = props => {
      const { items } = props,
        { quarter, display } = items,
        { tools, platforms } = display;

      return (
        <div className={compStyles.quarter}>
          <div className={compStyles.stack}>
            {platforms
              ? platforms.map((platform, k) => (
                  <Bubble
                    key={k}
                    className={compStyles.platform}
                    item={platform}
                  />
                ))
              : null}
            {tools
              ? tools.map((tool, l) => (
                  <Bubble key={l} className={compStyles.tool} item={tool} />
                ))
              : null}
          </div>
          <div className={compStyles.label}>{quarter}</div>
        </div>
      );
    };

    return (
      <div className={compStyles.roadmap}>
        <Key />
        {roadMap.map((quarter, i) =>
          this.showQuarter(quarter) ? <Quarter key={i} items={quarter} /> : null
        )}
      </div>
    );
  }
}

export default () => {
  const roadMap = RoadMapStaticQuery();

  return roadMap ? <RoadMap roadMap={roadMap} /> : null;
};

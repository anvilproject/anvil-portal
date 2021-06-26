/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news component.
 * Use of this component within markdown is possible.
 * Use the tag <news></news>.
 *
 * The prop "featured" is optional and returns only featured news.
 */

// Core dependencies
import React from "react";

// App dependencies
import { ScoopNewsStaticQuery } from "../../hooks/scoop-news-query";
import Scoops from "../scoops/scoops";

// Styles
import compStyles from "./news.module.css";

class News extends React.Component {
  render() {
    const { featuredOnly, scoops } = this.props;
    return (
      <Scoops
        className={compStyles.news}
        featuredOnly={featuredOnly}
        scoops={scoops}
        type="news"
      />
    );
  }
}

export default props => {
  const { featured } = props;
  const featuredOnly = featured || featured === "";
  const newsScoops = ScoopNewsStaticQuery();

  return <News featuredOnly={featuredOnly} scoops={newsScoops} />;
};

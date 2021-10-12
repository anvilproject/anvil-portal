/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL twitter timeline component - displays embedded timeline of @useAnVIL.
 */

// Core dependencies
import React from "react";
import Helmet from "react-helmet";

// Styles
import { timeline } from "./twitter-timeline.module.css";

class TwitterTimeline extends React.Component {
  render() {
    return (
      <div className={timeline}>
        <a
          className="twitter-timeline"
          data-width="600"
          data-theme="light"
          href="https://twitter.com/useAnVIL?ref_src=twsrc%5Etfw"
        >
          Tweets by useAnVIL
        </a>
        <Helmet>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
        </Helmet>
      </div>
    );
  }
}

export default TwitterTimeline;

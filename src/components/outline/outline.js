/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL outline component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { OutlineStaticQuery } from "../../hooks/outline-query";
import * as OutlineService from "../../utils/outline.service";
import * as ScrollingService from "../../utils/scrolling.service";

// Styles
import compStyles from "./outline.module.css";

const classNames = require("classnames");
let htmlCollection, outlineEl;

class Outline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { maxHeight: "unset", top: "unset" };
  }

  componentDidMount() {
    // Outline container element
    outlineEl = document.getElementById("outline");

    // "Html" html collection
    htmlCollection = document.getElementsByTagName("html");

    window.addEventListener("scroll", this.handleOutlineScroll);
    window.addEventListener("resize", this.updateNavStyles);

    if (outlineEl) {
      outlineEl.addEventListener(
        "mouseenter",
        this.disableDocumentOverflowStyle
      );
      outlineEl.addEventListener(
        "mouseleave",
        this.enableDocumentOverflowStyle
      );
      outlineEl.addEventListener("click", this.enableDocumentOverflowStyle);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOutlineScroll);
    window.removeEventListener("resize", this.updateNavStyles);

    if (outlineEl) {
      outlineEl.removeEventListener(
        "mouseenter",
        this.disableDocumentOverflowStyle
      );
      outlineEl.removeEventListener(
        "mouseleave",
        this.enableDocumentOverflowStyle
      );
      outlineEl.removeEventListener("click", this.enableDocumentOverflowStyle);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { articleOffsetTop, bannerHeight } = this.props;

    if (
      prevProps.bannerHeight !== bannerHeight ||
      prevProps.articleOffsetTop !== articleOffsetTop
    ) {
      this.updateNavStyles();
    }
  }

  disableDocumentOverflowStyle = () => {
    const outlineScrollable = ScrollingService.isOutlineScrollable(
      htmlCollection,
      outlineEl
    );

    if (outlineScrollable) {
      htmlCollection.item(0).setAttribute("style", "overflow: hidden;");
    }
  };

  enableDocumentOverflowStyle = () => {
    const outlineScrollable = ScrollingService.isOutlineScrollable(
      htmlCollection,
      outlineEl
    );

    if (outlineScrollable) {
      htmlCollection.item(0).setAttribute("style", "overflow-y: scroll;");
    }
  };

  handleOutlineScroll = () => {
    const { articleOffsetTop } = this.props;

    // Active outline
    const activeEls = document.getElementsByClassName(compStyles.active);

    // Manage outline max height style
    this.updateNavStyles();

    // Manage active outline position
    ScrollingService.manageActiveOutlineScrollPosition(
      activeEls,
      outlineEl,
      articleOffsetTop
    );
  };

  updateNavStyles = () => {
    const { articleOffsetTop, bannerHeight } = this.props;

    // Calculates the outline container maxHeight.
    const outlineStyles = ScrollingService.calculateContainerStyles(
      bannerHeight,
      articleOffsetTop
    );
    this.setState({
      maxHeight: outlineStyles.maxHeight,
      top: outlineStyles.top,
    });
  };

  render() {
    const { activeOutline, headings } = this.props;
    const { maxHeight, top } = this.state;

    const OutlineItem = (props) => {
      const { activeOutline, heading } = props;
      const outline = OutlineService.getOutline(heading);
      const { depth, anchor, label } = outline;
      const indent = depth === 3;

      return (
        <li>
          <a
            className={classNames(
              { [compStyles.indent]: indent },
              { [compStyles.active]: activeOutline === anchor }
            )}
            href={anchor}
          >
            {label}
          </a>
        </li>
      );
    };

    return (
      <div
        className={classNames(compStyles.outline, {
          [compStyles.empty]: !headings,
        })}
        id="outline"
        style={{ maxHeight: maxHeight, top: top }}
      >
        <ul>
          {headings ? (
            <>
              <li>
                <span>On This Page</span>
              </li>
              {headings.map((heading, i) => (
                <OutlineItem
                  key={i}
                  heading={heading}
                  activeOutline={activeOutline}
                />
              ))}
            </>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default (props) => {
  const docPath = props.docPath;
  const headings = OutlineService.filterHtmlAstByHeading(
    OutlineStaticQuery(),
    docPath
  );

  return headings ? <Outline headings={headings} {...props} /> : null;
};

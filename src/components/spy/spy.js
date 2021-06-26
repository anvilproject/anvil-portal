/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Anvil outline spy component.
 * Provides event listener for scroll and hashchange events.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as ScrollingService from "../../utils/scrolling.service";

class Spy extends React.Component {
  elementIdsByAnchorFromTop = new Map();
  contentAnchors = [];

  constructor(props) {
    super(props);

    this.state = { activeOutline: "" };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);
  }

  componentDidMount() {
    this.contentAnchors = ScrollingService.getContentAnchors();
    this.getPageAnchors();
    this.setFirstActiveOutline();

    window.addEventListener("resize", this.getPageAnchors);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("hashchange", this.handleHashChange, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getPageAnchors);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("hashchange", this.handleHashChange, false);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.activeOutline !== this.state.activeOutline) {
      const { setActiveOutline } = this.props;

      setActiveOutline(this.state.activeOutline);
    }
  }

  getPageAnchors = () => {
    this.elementIdsByAnchorFromTop = ScrollingService.calculateElementIdsByAnchorFromTop(
      this.contentAnchors,
      this.elementIdsByAnchorFromTop
    );
  };

  handleHashChange = () => {
    this.setState({ activeOutline: window.location.hash });
  };

  handleScroll = () => {
    const { articleOffsetTop } = this.props;

    let currentAction = ScrollingService.manageSpyScrollAction(
      this.elementIdsByAnchorFromTop,
      this.state.activeOutline,
      articleOffsetTop
    );

    // Update state if required
    if (currentAction !== this.state.activeOutline) {
      this.setState({ activeOutline: currentAction });
    }
  };

  setFirstActiveOutline = () => {
    const h1Anchor = [...this.elementIdsByAnchorFromTop][0][1];
    this.setState({ activeOutline: `#${h1Anchor}` });
  };

  render() {
    return this.props.children;
  }
}

export default Spy;

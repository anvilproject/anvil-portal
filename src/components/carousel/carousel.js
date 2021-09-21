/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel component.
 *
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import { CarouselStaticQuery } from "../../hooks/carousel-query";

// Styles
import * as compStyles from "./carousel.module.css";
import * as globalStyles from "../../styles/global.module.css";

// Template variables
const arrows = "../../../images/icon/arrows.png";
const left = "../../../images/icon/left.png";
const right = "../../../images/icon/right.png";
let x0 = null;
let y0 = null;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0 };
  }

  componentDidMount() {
    this.setTouchInteractions();
  }

  componentWillUnmount() {
    this.removeTouchInteractions();
  }

  changedTouches = (e) => {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  getActiveClassName = (index) => {
    return index === this.state.rotation;
  };

  getLink = (docType, slug, url) => {
    if (docType.toLowerCase() === "tools") {
      return "/overview#analysis-tools";
    }

    if (docType.toLowerCase() === "platforms") {
      return "/overview#platform-components";
    }

    return url ? url : slug;
  };

  isValidUrl = (link) => {
    try {
      new URL(link);
      return true;
    } catch (_) {
      return false;
    }
  };

  preventScrollingWhenSwiping = () => {
    return (e) => {
      const dx = this.changedTouches(e).clientX - x0;
      const dy = this.changedTouches(e).clientY - y0;

      const swiping = Math.abs(dx) > Math.abs(dy);

      if (swiping && e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
  };

  redirect = (linkTo, openTab) => {
    if (openTab) {
      window.open(linkTo);
    } else {
      window.location.href = linkTo;
    }
  };

  removeTouchInteractions = () => {
    const slot = document.getElementsByClassName(compStyles.slider)[0];

    slot.removeEventListener("mousedown", this.swipeStart());
    slot.removeEventListener("touchstart", this.swipeStart(), {
      passive: true,
    });

    slot.removeEventListener("mouseup", this.swipeEnd());
    slot.removeEventListener("touchend", this.swipeEnd());

    slot.addEventListener("touchmove", this.preventScrollingWhenSwiping(), {
      passive: false,
    });
  };

  rotateBack = () => {
    const { carousel } = this.props;
    const lastIndex = carousel.length - 1;

    let index = this.state.rotation - 1;

    if (index < 0) {
      index = lastIndex;
    }

    this.setState({ rotation: index });
  };

  rotateForward = () => {
    const { carousel } = this.props;
    const lastIndex = carousel.length - 1;

    let index = this.state.rotation + 1;

    if (index > lastIndex) {
      index = 0;
    }

    this.setState({ rotation: index });
  };

  rotateTo = (index) => {
    this.setState({ rotation: index });
  };

  setTouchInteractions = () => {
    const slot = document.getElementsByClassName(compStyles.slider)[0];

    slot.addEventListener("mousedown", this.swipeStart());
    slot.addEventListener("touchstart", this.swipeStart(), { passive: true });

    slot.addEventListener("mouseup", this.swipeEnd());
    slot.addEventListener("touchend", this.swipeEnd());

    slot.addEventListener("touchmove", this.preventScrollingWhenSwiping(), {
      passive: false,
    });
  };

  swipeEnd = () => {
    return (e) => {
      if (x0 || x0 === 0) {
        const dx = this.changedTouches(e).clientX - x0;
        const dy = this.changedTouches(e).clientY - y0;
        const swiping = Math.abs(dx) > Math.abs(dy);
        const s = Math.sign(dx);

        if (swiping) {
          if (s > 0) {
            this.rotateBack();
          }

          if (s < 0) {
            this.rotateForward();
          }
        }

        x0 = null;
        y0 = null;
      }
    };
  };

  swipeStart = () => {
    return (e) => {
      x0 = this.changedTouches(e).clientX;
      y0 = this.changedTouches(e).clientY;
    };
  };

  render() {
    const { carousel } = this.props;

    const Slot = (props) => {
      const { show, slot } = props,
        { fields, frontmatter } = slot,
        { description, docType, logo, title, url } = frontmatter || {},
        { slug } = fields;
      const linkTo = this.getLink(docType, slug, url);
      const openTab = this.isValidUrl(linkTo);

      return (
        <ClickHandler
          className={classNames({ [compStyles.show]: show }, compStyles.slot)}
          clickAction={() => this.redirect(linkTo, openTab)}
          tag={"div"}
          label={title}
        >
          <div className={compStyles.hero}>
            {logo ? <GatsbyImage alt={"logo"} image={getImage(logo)} /> : null}
            <div>
              <div className={compStyles.type}>{docType}</div>
              <h4>{title}</h4>
            </div>
          </div>
          <p className={compStyles.ellipsis}>{description}</p>
          <ClickHandler
            className={compStyles.learnMore}
            clickAction={() => this.redirect(linkTo, openTab)}
            tag={"p"}
            label={title}
          >
            Learn More
            <StaticImage alt={"learn more"} placeholder={"NONE"} src={arrows} />
          </ClickHandler>
        </ClickHandler>
      );
    };

    return (
      <section className={compStyles.carousel}>
        <div
          className={classNames(
            globalStyles.grid,
            globalStyles.g750,
            compStyles.rotation
          )}
        >
          <ClickHandler
            className={compStyles.arrow}
            clickAction={this.rotateBack}
            tag={"span"}
            label="Previous"
          >
            <StaticImage alt={"prev"} placeholder={"NONE"} src={left} />
          </ClickHandler>
          <div>
            <div className={compStyles.slider}>
              {carousel.map((slot, i) => (
                <Slot key={i} show={i === this.state.rotation} slot={slot} />
              ))}
            </div>
            <div className={compStyles.bullets}>
              {carousel.map((bullet, i) => (
                <ClickHandler
                  key={i}
                  className={classNames({
                    [compStyles.active]: this.getActiveClassName(i),
                  })}
                  clickAction={() => this.rotateTo(i)}
                  tag={"span"}
                  label={`Jump to slide ${i}`}
                />
              ))}
            </div>
          </div>
          <ClickHandler
            className={compStyles.arrow}
            clickAction={this.rotateForward}
            tag={"span"}
            label="Next"
          >
            <StaticImage alt={"next"} placeholder={"NONE"} src={right} />
          </ClickHandler>
        </div>
      </section>
    );
  }
}

export default () => {
  const carousel = CarouselStaticQuery();
  const showCarousel = carousel.length > 0;

  return showCarousel ? <Carousel carousel={carousel} /> : null;
};

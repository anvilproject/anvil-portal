/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - carousel component.
 *
 */

// Core dependencies
import React from "react";

// App dependencies
import {CarouselStaticQuery} from "../../hooks/carouselQuery";
import ClickHandler from "../clickHandler/clickHandler";

// Images
import arrows from "../../../images/icon/arrows.png";
import left from "../../../images/icon/left.png";
import right from "../../../images/icon/right.png";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./carousel.module.css";

let classNames = require("classnames");

let x0 = null;
let y0 = null;

class Carousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({rotation: 0});
    }

    componentDidMount() {

        this.setTouchInteractions();
    };

    componentWillUnmount() {

        this.removeTouchInteractions();
    };

    changedTouches = (e) => {

        return e.changedTouches ? e.changedTouches[0] : e
    };

    getActiveClassName = (index) => {

        return index === this.state.rotation;
    };

    isRelativePath = (link) => {

        // Returns true if specified link is a relative pathname
        if ( link.startsWith("/") ) {

            return true;
        }

        return false;
    };

    isValidUrl = (link) => {

        try {
            new URL(link);
            return true;
        }
        catch (_) {
            return false;
        }
    };

    preventScrollingWhenSwiping = () => {

        return (e) => {

            const dx = this.changedTouches(e).clientX - x0;
            const dy = this.changedTouches(e).clientY - y0;

            const swiping = Math.abs(dx) > Math.abs(dy);

            if ( swiping && e.cancelable ) {

                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    };

    redirect = (linkTo, openTab) => {

        if (openTab) {

            window.open(linkTo)
        }
        else {

            window.location.href = linkTo;
        }
    };

    removeTouchInteractions = () => {

        const slot = document.getElementsByClassName(compStyles.slider)[0];

        slot.removeEventListener("mousedown", this.swipeStart());
        slot.removeEventListener("touchstart", this.swipeStart(), {passive: true});

        slot.removeEventListener("mouseup", this.swipeEnd());
        slot.removeEventListener("touchend", this.swipeEnd());

        slot.addEventListener("touchmove", this.preventScrollingWhenSwiping(), {passive: false});
    };

    rotateBack = () => {

        const {carousel} = this.props;
        const lastIndex = carousel.length - 1;

        let index = this.state.rotation - 1;

        if (index < 0) {

            index = lastIndex;
        }

        this.setState({rotation: index})
    };

    rotateForward = () => {

        const {carousel} = this.props;
        const lastIndex = carousel.length - 1;

        let index = this.state.rotation + 1;

        if (index > lastIndex) {

            index = 0;
        }

        this.setState({rotation: index})
    };

    rotateTo = (index) => {

        this.setState({rotation: index})
    };

    setTouchInteractions = () => {

        const slot = document.getElementsByClassName(compStyles.slider)[0];

        slot.addEventListener("mousedown", this.swipeStart());
        slot.addEventListener("touchstart", this.swipeStart(), {passive: true});

        slot.addEventListener("mouseup", this.swipeEnd());
        slot.addEventListener("touchend", this.swipeEnd());

        slot.addEventListener("touchmove", this.preventScrollingWhenSwiping(), {passive: false});
    };

    swipeEnd = () => {

        return (e) => {

            if (x0 || x0 === 0) {

                const dx = this.changedTouches(e).clientX - x0;
                const dy = this.changedTouches(e).clientY - y0;
                const swiping = Math.abs(dx) > Math.abs(dy);
                const s = Math.sign(dx);

                if ( swiping ) {

                    if ( s > 0 ) {

                        this.rotateBack();
                    }

                    if ( s < 0 ) {

                        this.rotateForward();
                    }
                }

                x0 = null;
                y0 = null;
            }
        }
    };

    swipeStart = () => {

        return (e) => {

            x0 = this.changedTouches(e).clientX;
            y0 = this.changedTouches(e).clientY;
        }
    };

    render() {
        const {carousel} = this.props;

        const Slot = (props) => {

            const {show, slot} = props,
                {carousel, slug} = slot,
                {blurb, docType, logo, title, url} = carousel,
                {childImageSharp} = logo || {},
                {fluid} = childImageSharp || {},
                {src} = fluid || {};

            const linkTo = this.isValidUrl(url) ? url : this.isRelativePath(url) ? url : slug;
            const openTab = this.isValidUrl(url);

            return (
                <ClickHandler className={classNames({[compStyles.show]: show}, compStyles.slot)}
                              clickAction={() => this.redirect(linkTo, openTab)}
                              tag={"div"}>
                    <div className={compStyles.hero}>
                        {logo ? <img src={src} alt="logo"/> : null}
                        <div>
                            <div className={compStyles.type}>{docType}</div>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <p className={compStyles.ellipsis}>{blurb}</p>
                    <ClickHandler className={compStyles.learnMore}
                       clickAction={() => this.redirect(linkTo, openTab)} tag={"p"}>Learn More<img src={arrows} alt="learn more"/>
                    </ClickHandler>
                </ClickHandler>
            )
        };

        return (
            <section className={compStyles.carousel}>
                <div className={classNames(globalStyles.grid, globalStyles.g750, compStyles.rotation)}>
                    <ClickHandler className={compStyles.arrow}
                                  clickAction={this.rotateBack}
                                  tag={"span"}>
                        <img src={left} alt="prev"/>
                    </ClickHandler>
                    <div>
                        <div className={compStyles.slider}>
                            {carousel.map((slot, i) => <Slot key={i} show={i === this.state.rotation} slot={slot}/>)}
                        </div>
                        <div className={compStyles.bullets}>
                            {carousel.map((bullet, i) =>
                                <ClickHandler key={i}
                                      className={classNames({[compStyles.active]: this.getActiveClassName(i)})}
                                      clickAction={() => this.rotateTo(i)}
                                              tag={"span"}/>)}
                        </div>
                    </div>
                    <ClickHandler className={compStyles.arrow}
                                  clickAction={this.rotateForward}
                                  tag={"span"}>
                        <img src={right} alt="next"/>
                    </ClickHandler>
                </div>
            </section>
        );
    }
}

export default () => {

    const carousel = CarouselStaticQuery();
    const showCarousel = carousel.length > 0;

    return (
        showCarousel ? <Carousel carousel={carousel}/> : null
    )
}

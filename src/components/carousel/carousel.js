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
import {carouselStaticQuery} from "../../hooks/carouselQuery";

// Images
import arrows from "../../../images/icon/arrows.png";
import left from "../../../images/icon/left.png";
import right from "../../../images/icon/right.png";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./carousel.module.css";

let classNames = require("classnames");

class Carousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {rotation: 0};
    }

    getActiveClassName = (index) => {

        return index === this.state.rotation;
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

    redirect = (linkTo, openTab) => {

        if (openTab) {

            window.open(linkTo)
        }
        else {

            window.location.href = linkTo;
        }
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

    render() {
        const {carousel} = this.props;

        const Slot = (props) => {

            const {show, slot} = props,
                {carousel, slug} = slot,
                {blurb, docType, title, url} = carousel;

            const linkTo = this.isValidUrl(url) ? url : slug;
            const openTab = this.isValidUrl(url);

            return (
                <div className={classNames({[compStyles.show]: show}, compStyles.slot)}
                     onClick={() => this.redirect(linkTo, openTab)}>
                    <div className={compStyles.type}>{docType}</div>
                    <h4>{title}</h4>
                    <p className={compStyles.ellipsis}>{blurb}</p>
                    <p className={compStyles.learnMore} onClick={() => this.redirect(linkTo, openTab)}>Learn More<img src={arrows} alt="learn more"/></p>
                </div>
            )
        };

        return (
            <section className={compStyles.carousel}>
                <div className={classNames(globalStyles.sectionInner, compStyles.rotation)}>
                    <img src={left} alt="prev" onClick={this.rotateBack}/>
                    <div>
                        <div className={compStyles.slider}>
                            {carousel.map((slot, i) => <Slot key={i} show={i === this.state.rotation} slot={slot}/>)}
                        </div>
                        <div className={compStyles.bullets}>
                            {carousel.map((bullet, i) => <span key={i}
                                                               className={classNames({[compStyles.active]: this.getActiveClassName(i)})}
                                                               onClick={() => this.rotateTo(i)}/>)}
                        </div>
                    </div>
                    <img src={right} alt="next" onClick={this.rotateForward}/>
                </div>
            </section>
        );
    }
}

export default () => {

    const carousel = carouselStaticQuery();
    const showCarousel = carousel.length > 0;

    return (
        showCarousel ? <Carousel carousel={carousel}/> : null
    )
}

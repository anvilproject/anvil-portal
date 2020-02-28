/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL outline component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {OutlineStaticQuery} from "../../hooks/outlineQuery";
import * as OutlineService from "../../utils/outline.service";
import * as ScrollingService from "../../utils/scrolling.service";

// Styles
import compStyles from "./outline.module.css";

let classNames = require("classnames");
let htmlCollection, outlineEl;

class Outline extends React.Component {

    componentDidMount() {

        // Outline container element
        outlineEl = document.getElementById("outline");

        // "Html" html collection
        htmlCollection = document.getElementsByTagName("html");

        // Initialize outline style
        this.setOutlineMaxHeight();

        window.addEventListener("scroll", this.handleOutlineScroll);
        window.addEventListener("resize", this.setOutlineMaxHeight);

        if ( outlineEl ) {

            outlineEl.addEventListener("mouseenter", this.disableDocumentOverflowStyle);
            outlineEl.addEventListener("mouseleave", this.enableDocumentOverflowStyle);
            outlineEl.addEventListener("click", this.enableDocumentOverflowStyle);
        }
    };

    componentWillUnmount() {

        window.removeEventListener("scroll", this.handleOutlineScroll);
        window.removeEventListener("resize", this.setOutlineMaxHeight);

        if ( outlineEl ) {

            outlineEl.removeEventListener("mouseenter", this.disableDocumentOverflowStyle);
            outlineEl.removeEventListener("mouseleave", this.enableDocumentOverflowStyle);
            outlineEl.removeEventListener("click", this.enableDocumentOverflowStyle);
        }
    };

    componentDidUpdate(prevProp) {

        const {bannerHeight} = this.props;

        if ( prevProp.bannerHeight !== bannerHeight ) {

            this.setOutlineMaxHeight();
        }
    }

    disableDocumentOverflowStyle = () => {

        const outlineScrollable = ScrollingService.isOutlineScrollable(htmlCollection, outlineEl);

        if ( outlineScrollable ) {

                htmlCollection.item(0).setAttribute("style", "overflow: hidden;")
        }
    };

    enableDocumentOverflowStyle = () => {

        const outlineScrollable = ScrollingService.isOutlineScrollable(htmlCollection, outlineEl);

        if ( outlineScrollable ) {

            htmlCollection.item(0).setAttribute("style", "overflow-y: scroll;");
        }
    };

    handleOutlineScroll = () => {

        // Active outline
        const activeEls = document.getElementsByClassName(compStyles.active);

        // Manage outline max height style
        this.setOutlineMaxHeight();

        // Manage active outline position
        ScrollingService.manageActiveOutlineScrollPosition(activeEls, outlineEl);
    };

    setOutlineMaxHeight = () => {

        const {bannerHeight} = this.props;

        // Calculates the outline container maxHeight.
        ScrollingService.calculateNavMaxHeight(bannerHeight, outlineEl);
    };

    render() {
        const {activeOutline, headings} = this.props;

        const Outline = (props) => {

            const {activeOutline, heading} = props;
            const outline = OutlineService.getOutline(heading);
            const {depth, anchor, label} = outline;
            const indent = depth === 3;

            return (
                <li>
                    <a className={classNames({[compStyles.indent]: indent}, {[compStyles.active]: activeOutline === anchor})}
                       href={anchor}>{label}</a>
                </li>
            )
        };

        return (
            <div className={compStyles.outline} id="outline">
                <ul>
                    {headings ? headings.map((heading, i) =>
                        <Outline key={i} heading={heading} activeOutline={activeOutline}/>) : null}
                </ul>
            </div>
        );
    }
}

export default (props) => {

    const docPath = props.docPath;
    const headings = OutlineService.filterHtmlAstByHeading(OutlineStaticQuery(), docPath);

    return (
        <Outline headings={headings} {...props}/>
    );
}

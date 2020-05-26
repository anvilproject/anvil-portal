/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - markdown component.
 */

// Core dependencies
import React from "react";
import rehypeReact from "rehype-react";

// App dependencies
import Button from "../button/button";
import CardCollection from "../card-collection/card-collection";
import DataDetail from "../data-detail/data-detail";
import DataSummary from "../data-summary/data-summary";
import EventHero from "../event-hero/event-hero";
import Events from "../events/events";
import FigureCaption from "../figure-caption/figure-caption";
import GoArrow from "../go-arrow/go-arrow";
import Hero from "../hero/hero";
import StyleGuideColorPalette from "../style-guide-color-palette/style-guide-color-palette";
import StyleGuideDownloadLogo from "../style-guide-download-logo/style-guide-download-logo";
import StyleGuideTypography from "../style-guide-typography/style-guide-typography";
import StyleGuideTypographyExample from "../style-guide-typography-example/style-guide-typography-example";

// Styles
import compStyles from "./markdown.module.css";

let classNames = require("classnames");

class Markdown extends React.Component {

    componentDidMount() {

        this.addImageClassName();
    }

    addImageClassName = () => {

        // Find all <span> elements
        const contentEl = document.querySelector('[id^="content"]');

        if ( !contentEl ) {
            return;
        }

        const imagesEl = Array.from(contentEl.querySelectorAll("span"));

        // Filter for <span> that wraps the images for medium-zoom capability (therefore will exclude gif images)
        const imagesWithZoomEl = imagesEl.filter(image => image.className.includes("gatsby-resp-image-wrapper"));

        // Add class name
        imagesWithZoomEl.map(image => image.classList.add(compStyles.zoomIcon));
    };

    render() {
        const {children, className} = this.props;
        const renderAst = new rehypeReact({
            createElement: React.createElement,
            components: {
                "button": Button,
                "card-collection": CardCollection,
                "data-detail": DataDetail,
                "data-summary": DataSummary,
                "event-hero": EventHero,
                "events": Events,
                "figure-caption": FigureCaption,
                "go-arrow": GoArrow,
                "hero": Hero,
                "style-guide-color-palette": StyleGuideColorPalette,
                "style-guide-download-logo": StyleGuideDownloadLogo,
                "style-guide-typography": StyleGuideTypography,
                "style-guide-typography-example": StyleGuideTypographyExample
            }
        }).Compiler;
        const identifier = Date.now();
        return (
            <div id={`content${identifier}`} className={classNames(className, compStyles.content)}>{renderAst(children)}</div>
        );
    }
}

export default Markdown;

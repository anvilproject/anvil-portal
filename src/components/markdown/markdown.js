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
import Events from "../events/events";
import FigureCaption from "../figureCaption/figureCaption";
import GoArrow from "../goArrow/goArrow";
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
        let imagesEl = Array.from(document.getElementById("content").querySelectorAll("span"));

        // Filter for <span> that wraps the images for medium-zoom capability (therefore will exclude gif images)
        let imagesWithZoomEl = imagesEl.filter(image => image.className.includes("gatsby-resp-image-wrapper"));

        // Add class name
        imagesWithZoomEl.map(image => image.classList.add(compStyles.zoomIcon));
    };

    render() {
        const {children, className} = this.props;
        const renderAst = new rehypeReact({
            createElement: React.createElement,
            components: {
                "button": Button,
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
        return (
            <div id="content" className={classNames(className, compStyles.content)}>{renderAst(children)}</div>
        );
    }
}

export default Markdown;

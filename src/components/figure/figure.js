/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - figure component.
 * Provides an image with a title or explanation.
 * Use of this component within markdown is possible.
 *
 * Children
 * --------
 * Children should have the following format:
 * <img src={imgSrc} alt="image alternate name">
 * <figure-caption>Caption text.</figure-caption>
 *
 * For example,
 * <figure>
 *     <img alt="AnVIL Overview" src="../_images/anvil-overview.png">
 *     <figure-caption>An overview of AnVIL.</figure-caption>
 * </figure>
 *
 * Note
 * ----
 * - `alt` and `src` are both required fields of <img> element.
 * - Any caption text with an anchor link must be parsed as html using the <a> element. Any external link may use the component <external-link>.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./figure.module.css";

function Figure(props) {

    const {children} = props;

    return (
        <figure className={compStyles.figureContainer}>
            {children}
        </figure>
    );
}

export default Figure;

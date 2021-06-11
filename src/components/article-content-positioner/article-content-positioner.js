/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article content positioner component.
 * Provides positioning to the article content.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "../article-content-positioner/article-content-positioner.module.css";

const classNames = require("classnames");

function ArticleContentPositioner(props) {

    const {children, left} = props;
    const classNamesContentPositioner = classNames(compStyles.contentPositioner, {[compStyles.left]: left});

    return (
        <div className={classNamesContentPositioner}>
            {children}
        </div>
    );
}

export default ArticleContentPositioner;

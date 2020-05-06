/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article body component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Markdown from "../markdown/markdown";

// Styles
import compStyles from "./article-body.module.css";

let classNames = require("classnames");

class ArticleBody extends React.Component {

    render() {
        const {children, className, htmlAst} = this.props;
        return (
            <div className={classNames(compStyles.articleBody, className)}>
                <Markdown>{htmlAst}</Markdown>
                {children}
            </div>
        );
    }
}

export default (props) => {

    const {className, htmlAst} = props;

    return (
        <ArticleBody className={className} htmlAst={htmlAst} {...props}/>
    )
}

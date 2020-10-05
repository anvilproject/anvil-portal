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

class ArticleBody extends React.Component {

    render() {
        const {children, className, htmlAst} = this.props;
        return (
            <div className={compStyles.articleBody}>
                <Markdown className={className}>{htmlAst}</Markdown>
                {children}
            </div>
        );
    }
}

export default ArticleBody;

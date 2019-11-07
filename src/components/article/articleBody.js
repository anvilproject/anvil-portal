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
import compStyles from "./articleBody.module.css";

class ArticleBody extends React.Component {

    render() {
        const {children, htmlAst} = this.props;
        return (
            <div className={compStyles.articleBody}>
                <Markdown>{htmlAst}</Markdown>
                {children}
            </div>
        );
    }
}

export default (props) => {

    const {htmlAst} = props;

    return (
        <ArticleBody htmlAst={htmlAst} {...props}/>
    )
}

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article body component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./articleBody.module.css";

class ArticleBody extends React.Component {

    render() {
        const {children, html} = this.props;
        return (
            <div className={compStyles.articleBody}>
                <div className={compStyles.content} dangerouslySetInnerHTML={{__html: html}}/>
                {children}
            </div>
        );
    }
}

export default (props) => {

    const {html} = props;

    return (
        <ArticleBody html={html} {...props}/>
    )
}

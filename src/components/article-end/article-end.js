/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL article end component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// Styles
import compStyles from "./article-end.module.css";

let classNames = require("classnames");

class ArticleEnd extends React.Component {

    render() {
        const {docPath} = this.props,
            editPath = `https://github.com/anvilproject/anvil-portal/tree/staging/content${docPath}.md`;

        return (
            <div className={classNames(compStyles.articleEnd)}>
                <a href={editPath} target="_blank" rel="noopener noreferrer">Improve this page</a>
                <Link to={"/content-guide"}>Content guide</Link>
            </div>
        );
    }
}

export default (props) => {
    return (
        <ArticleEnd {...props}/>
    )
}

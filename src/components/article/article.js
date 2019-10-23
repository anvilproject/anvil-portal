/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Nav from "../nav/nav";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./article.module.css";

const classNames = require("classnames");

class Article extends React.Component {

    render() {
        const {children, docPath} = this.props;
        return (
            <section className={compStyles.article}>
                <div className={classNames(globalStyles.container, compStyles.container)}>
                    <Nav docPath={docPath}/>
                    {children}
                </div>
            </section>
        );
    }
}

export default Article;

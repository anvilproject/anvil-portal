/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL main [content] component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Article from "../article/article";

// Styles
import compStyles from "./main.module.css";

class Main extends React.Component {

    render() {
        const {children, docPath, homePage} = this.props;
        return (
            <main className={compStyles.main}>
                {homePage ? children : <Article docPath={docPath}>{children}</Article>}
            </main>
        );
    }
}

export default Main;

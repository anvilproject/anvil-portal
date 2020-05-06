/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - 404 error page.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// App dependencies
import Hero from "../components/hero/hero";
import Layout from "../components/layout";

// Images
import bubbles from "../../images/404.png";

// Styles
import bodyStyles from "../components/article/article-body.module.css";
import globalStyles from "../styles/global.module.css";
import compStyles from "./404.module.css";

let classNames = require("classnames");

class PageNotFound extends React.Component {

    render() {
        return (
            <Layout noSpy>
                <div className={classNames(compStyles.error, bodyStyles.articleBody)}>
                    <h1>Oh Dear!</h1>
                    <Hero>We can’t find the page you were looking for.</Hero>
                    <Hero small>Try these working links instead:</Hero>
                    <img className={compStyles.bubbles} alt="Page Not Found" src={bubbles}/>
                    <p><Link className={globalStyles.link} to="/">Home</Link></p>
                    <p><Link className={globalStyles.link} to="/help">Help</Link></p>
                </div>
            </Layout>
        );
    }
}

export default PageNotFound;

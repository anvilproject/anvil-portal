/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - 404 error page.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies
import Layout from "../components/layout";

// Images
import bubbles from "../../images/404.png";

// Styles
import globalStyles from "../styles/global.module.css";
import compStyles from "./404.module.css";

let classNames = require("classnames");

class PageNotFound extends React.Component {
  render() {
    return (
      <Layout noSpy title={"The AnVIL"}>
        <div className={classNames(compStyles.error)}>
          <h1>Oh Dear!</h1>
          <h2>We can’t find the page you were looking for.</h2>
          <p>Try these working links instead:</p>
          <img
            className={compStyles.bubbles}
            alt="Page Not Found"
            src={bubbles}
          />
          <p>
            <Link className={globalStyles.link} to="/">
              Home
            </Link>
          </p>
          <p>
            <Link className={globalStyles.link} to="/help">
              Help
            </Link>
          </p>
        </div>
      </Layout>
    );
  }
}

export default PageNotFound;

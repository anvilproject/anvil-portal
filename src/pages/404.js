/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - 404 error page.
 */

// Core dependencies
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

// App dependencies
import Layout from "../components/layout";

// Styles
import * as globalStyles from "../styles/global.module.css";
import * as compStyles from "./404.module.css";

// Template variables
const bubbles = "../../images/404.png";

class PageNotFound extends React.Component {
  render() {
    return (
      <Layout noSpy title={"The AnVIL"}>
        <div className={compStyles.error}>
          <h1>Oh Dear!</h1>
          <h2>We can’t find the page you were looking for.</h2>
          <p>Try these working links instead:</p>
          <StaticImage
            alt="Page Not Found"
            className={compStyles.bubbles}
            placeholder={"NONE"}
            src={bubbles}
          />
          <p>
            <Link className={globalStyles.asLink} to="/">
              Home
            </Link>
          </p>
          <p>
            <Link className={globalStyles.asLink} to="/help">
              Help
            </Link>
          </p>
        </div>
      </Layout>
    );
  }
}

export default PageNotFound;

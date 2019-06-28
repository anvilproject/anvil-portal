/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - home page.
 */

// Core dependencies
import React from "react"
import {isBrowser} from "react-device-detect";

// App dependencies
import Layout from "../components/layout";
import FeaturedWorkspaces from "../components/featured/featuredWorkspaces";

// Images
import hero from "../../images/hero.png"

// Styles
import compStyles from "./index.module.css";
import globalStyles from "../styles/global.module.css";

let classNames = require("classnames");

const IndexPage = () => (
    <Layout homePage={true}>
        <div
            className={classNames(globalStyles.main, compStyles.homePage, {[compStyles.handheld]: !isBrowser})}>
            <section className={globalStyles.bgLight}>
                <div className={classNames(globalStyles.sectionInner, globalStyles.centered)}>
                    <div className={compStyles.headline}>Welcome to The&nbsp;AnVIL</div>
                    <div className={compStyles.hero}>User-centered solution for genomic data access, analysis, and
                        visualization. Based on familiar software platforms. Engineered for cloud infrastructure.
                    </div>
                    <img src={hero} alt="anVIL"/>
                </div>
            </section>
            <FeaturedWorkspaces/>
        </div>
    </Layout>
);

export default IndexPage;

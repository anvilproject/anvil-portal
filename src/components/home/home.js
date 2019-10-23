/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL homepage component.
 */

// Core dependencies
import React from "react";
import {isBrowser} from "react-device-detect";

// App dependencies
import FeaturedWorkspaces from "../featured/featuredWorkspaces";

// Images
import hero from "../../../images/hero.png"

// Styles
import compStyles from "./home.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class Home extends React.Component {

    render() {
        return (
            <>
            <section className={classNames(globalStyles.bgLight, compStyles.hero, {[compStyles.handheld]: !isBrowser})}>
                <div className={classNames(globalStyles.sectionInner, globalStyles.centered)}>
                    <div className={compStyles.headline}>Welcome to AnVIL</div>
                    <div className={compStyles.subhead}>User-centered solution for genomic data access, analysis, and
                        visualization. Based on familiar software platforms. Engineered for cloud infrastructure.
                    </div>
                    <img src={hero} alt="anVIL"/>
                </div>
            </section>
            <FeaturedWorkspaces/>
            </>
        );
    }
}

export default Home;

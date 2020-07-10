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
import Carousel from "../carousel/carousel";
import Events from "../events/events";
import GoArrow from "../go-arrow/go-arrow";
import News from "../news/news";
import RoadMap from "../road-map/road-map";
import SectionBody from "../section/section-body";
import SectionIntro from "../section/section-intro";
import Stats from "../stats/stats";
import Twitter from "../twitter/twitter";
import Workspaces from "../workspaces/workspaces";

// Styles
import goStyles from "../go-arrow/go-arrow.module.css";
import compStyles from "./home.module.css";
import globalStyles from "../../styles/global.module.css";

// Logos
import logoTerra from "../../../images/logo-terra.png";

let classNames = require("classnames");

class Home extends React.Component {

    render() {
        return (
            <>
            <section className={classNames(compStyles.hero, {[compStyles.handheld]: !isBrowser})}>
                <div className={classNames(globalStyles.grid, globalStyles.g750, globalStyles.centered)}>
                    <div className={compStyles.headline}>Migrate Your Genomic Analysis Workflows to the Cloud</div>
                    <div className={compStyles.subhead}>Analyze large, open & controlled-access genomic datasets with familiar tools and reproducible workflows in a secure cloud-based computing environment.</div>
                    <GoArrow className={goStyles.stretch}><a href="https://anvil.terra.bio/#workspaces" className={compStyles.linkTerra} rel="nofollow noopener noreferrer" target="_blank"><img className={compStyles.logoTerra} src={logoTerra} alt="Terra"/>Launch AnVIL in Terra</a></GoArrow>
                    <Stats/>
                </div>
            </section>
            <Carousel/>
            <section className={compStyles.onboarding}>
                <SectionIntro end fileName={"get-started"}/>
            </section>
            <section className={compStyles.accessing}>
                <SectionIntro fileName={"access-data"} start/>
            </section>
            <section className={compStyles.submitting}>
                <SectionIntro end fileName={"contribute-data"} wrap/>
            </section>
            <section className={compStyles.featured}>
                <SectionIntro fileName={"featured-workspaces"} stretch/>
                <SectionBody><Workspaces featured/></SectionBody>
            </section>
            <section className={compStyles.roadmap}>
                <SectionIntro fileName={"road-map"} stretch/>
                <SectionBody><RoadMap/></SectionBody>
            </section>
            <section className={compStyles.news}>
                <SectionIntro sectionTitle={"News"} stretch/>
                <SectionBody><News featured/></SectionBody>
            </section>
            <section className={compStyles.events}>
                <SectionIntro sectionTitle={"Events"} stretch/>
                <SectionBody><Events featured/></SectionBody>
            </section>
                <section className={compStyles.twitter}>
                    <SectionIntro sectionTitle={"@useAnVIL on Twitter"} stretch/>
                    <SectionBody><Twitter/></SectionBody>
                </section>
            </>
        );
    }
}

export default Home;

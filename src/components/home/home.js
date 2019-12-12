/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL homepage component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";
import {isBrowser} from "react-device-detect";

// App dependencies
import {eventsStaticQuery} from "../../hooks/eventsQuery";
import {featuredWorkspacesStaticQuery} from "../../hooks/featuredWorkspacesQuery";
import {newsStaticQuery} from "../../hooks/newsQuery";
import {roadMapIntroStaticQuery} from "../../hooks/roadMapIntroQuery";
import * as ScoopsService from "../../utils/scoops.service";
import RoadMap from "../roadMap/roadMap";
import Scoop from "../scoops/scoop";
import SectionBody from "../section/sectionBody";
import SectionIntro from "../section/sectionIntro";
import Workspaces from "../workspaces/workspaces";

// Images
import hero from "../../../images/hero.png"

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./home.module.css";

let classNames = require("classnames");

class Home extends React.Component {

    render() {
        const {events, eventsScoops, news, newsScoops, roadMapIntro, workspaces} = this.props;
        const featuredNews = ScoopsService.isAnyScoopsFeatured(newsScoops);
        const featuredEvents = ScoopsService.isAnyScoopsFeatured(eventsScoops);
        return (
            <>
            <section className={classNames(compStyles.hero, {[compStyles.handheld]: !isBrowser})}>
                <div className={classNames(globalStyles.sectionInner, globalStyles.centered)}>
                    <div className={compStyles.headline}>Cloud-based Genomic Data Science</div>
                    <div className={compStyles.subhead}>AnVIL &ndash; an Analysis, Visualization, and Informatics Lab-space for democratizing genomic data access, sharing and computing across large genomic-related data sets.
                    </div>
                    <Link to="/about" className={compStyles.learnMore}>Learn More</Link>
                    <img src={hero} alt="anVIL"/>
                </div>
            </section>
            <section className={compStyles.featured}>
                <SectionIntro post={workspaces}/>
                <SectionBody className={compStyles.bgPale}><Workspaces/></SectionBody>
            </section>
            <section className={compStyles.roadmap}>
                <SectionIntro post={roadMapIntro}/>
                <SectionBody><RoadMap/></SectionBody>
            </section>
            {featuredNews ? <section className={compStyles.news}>
                <SectionIntro post={news}/>
                <SectionBody><Scoop featuredOnly={true} scoops={newsScoops}/></SectionBody>
            </section> : null}
            {featuredEvents ? <section className={compStyles.events}>
                <SectionIntro post={events}/>
                <SectionBody><Scoop featuredOnly={true} scoops={eventsScoops}/></SectionBody>
            </section> : null}
            </>
        );
    }
}

export default () => {

    const events = ScoopsService.getIntroduction(eventsStaticQuery());
    const eventsScoops = ScoopsService.getScoops(eventsStaticQuery());
    const news = ScoopsService.getIntroduction(newsStaticQuery());
    const newsScoops = ScoopsService.getScoops(newsStaticQuery());
    const roadMap = roadMapIntroStaticQuery();
    const workspaces = featuredWorkspacesStaticQuery();

    return (
        <Home events={events} eventsScoops={eventsScoops} news={news} newsScoops={newsScoops} roadMapIntro={roadMap} workspaces={workspaces}/>
    )
}

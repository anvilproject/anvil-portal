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
import {AccessingStaticQuery} from "../../hooks/accessingQuery";
import {EventsStaticQuery} from "../../hooks/eventsQuery";
import {FeaturedWorkspacesStaticQuery} from "../../hooks/featuredWorkspacesQuery";
import {NewsStaticQuery} from "../../hooks/newsQuery";
import {OnboardingStaticQuery} from "../../hooks/onboardingQuery";
import {RoadMapIntroStaticQuery} from "../../hooks/roadMapIntroQuery";
import * as ScoopsService from "../../utils/scoops.service";
import Carousel from "../carousel/carousel";
import GoArrow from "../goArrow/goArrow";
import RoadMap from "../roadMap/roadMap";
import Scoop from "../scoops/scoop";
import SectionBody from "../section/sectionBody";
import SectionIntro from "../section/sectionIntro";
import Stats from "../stats/stats";
import Workspaces from "../workspaces/workspaces";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./home.module.css";

let classNames = require("classnames");

class Home extends React.Component {

    render() {
        const {accessing, events, eventsScoops, news, newsScoops, onboarding, roadMapIntro, submitting, workspaces} = this.props;
        const featuredNews = ScoopsService.isAnyScoopsFeatured(newsScoops);
        const featuredEvents = ScoopsService.isAnyScoopsFeatured(eventsScoops);
        return (
            <>
            <section className={classNames(compStyles.hero, {[compStyles.handheld]: !isBrowser})}>
                <div className={classNames(globalStyles.grid, globalStyles.g750, globalStyles.centered)}>
                    <div className={compStyles.headline}>Cloud-based Genomic Data Science</div>
                    <div className={compStyles.subhead}>AnVIL &ndash; an Analysis, Visualization, and Informatics Lab-space for democratizing genomic data access, sharing and computing across large genomic-related data sets.
                    </div>
                    <GoArrow><Link to="/about">Learn More</Link></GoArrow>
                    <Stats/>
                </div>
            </section>
            <Carousel/>
            <section className={compStyles.onboarding}>
                <SectionIntro end post={onboarding}/>
            </section>
            <section className={compStyles.accessing}>
                <SectionIntro post={accessing} start/>
            </section>
            <section className={compStyles.submitting}>
                <SectionIntro end post={submitting} wrap/>
            </section>
            <section className={compStyles.featured}>
                <SectionIntro post={workspaces} stretch/>
                <SectionBody><Workspaces/></SectionBody>
            </section>
            <section className={compStyles.roadmap}>
                <SectionIntro post={roadMapIntro} stretch/>
                <SectionBody><RoadMap/></SectionBody>
            </section>
            {featuredNews ? <section className={compStyles.news}>
                <SectionIntro post={news} stretch/>
                <SectionBody><Scoop featuredOnly={true} scoops={newsScoops}/></SectionBody>
            </section> : null}
            {featuredEvents ? <section className={compStyles.events}>
                <SectionIntro post={events} stretch/>
                <SectionBody><Scoop featuredOnly={true} scoops={eventsScoops}/></SectionBody>
            </section> : null}
            </>
        );
    }
}

export default () => {

    const accessing = AccessingStaticQuery();
    const events = ScoopsService.getIntroduction(EventsStaticQuery());
    const eventsScoops = ScoopsService.getScoops(EventsStaticQuery());
    const news = ScoopsService.getIntroduction(NewsStaticQuery());
    const newsScoops = ScoopsService.getScoops(NewsStaticQuery());
    const onboarding = OnboardingStaticQuery();
    const submitting = SubmittingStaticQuery();
    const roadMap = RoadMapIntroStaticQuery();
    const workspaces = FeaturedWorkspacesStaticQuery();

    return (
        <Home accessing={accessing} events={events} eventsScoops={eventsScoops} news={news} newsScoops={newsScoops} onboarding={onboarding} roadMapIntro={roadMap} submitting={submitting} workspaces={workspaces}/>
    )
}

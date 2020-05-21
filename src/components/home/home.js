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
import GoArrow from "../go-arrow/go-arrow";
import {AccessingStaticQuery} from "../../hooks/accessing-query";
import {EventsStaticQuery} from "../../hooks/events-query";
import {FeaturedWorkspacesStaticQuery} from "../../hooks/featured-workspaces-query";
import {NewsStaticQuery} from "../../hooks/news-query";
import {OnboardingStaticQuery} from "../../hooks/onboarding-query";
import {RoadMapIntroStaticQuery} from "../../hooks/road-map-intro-query";
import {SubmittingStaticQuery} from "../../hooks/submitting-query";
import RoadMap from "../road-map/road-map";
import Scoop from "../scoops/scoop";
import SectionBody from "../section/section-body";
import SectionIntro from "../section/section-intro";
import Stats from "../stats/stats";
import * as ScoopsService from "../../utils/scoops.service";
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
                    <GoArrow className={goStyles.stretch}><a href="https://anvil.terra.bio/#workspaces" className={compStyles.linkTerra} rel="nofollow noopener noreferrer" target="_blank"><img className={compStyles.logoTerra} src={logoTerra} alt="Terra"/>Launch AnVIL in Terra</a></GoArrow>
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
                <SectionBody><Scoop featuredOnly={true} scoops={eventsScoops} type={"events"}/></SectionBody>
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

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
import {featuredWorkspacesStaticQuery} from "../../hooks/featuredWorkspacesQuery";
import {newsStaticQuery} from "../../hooks/newsQuery";
import * as ScoopsService from "../../utils/scoops.service";
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
        const {featured, news, newsScoops} = this.props;
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
            <section className={compStyles.featured}>
                <SectionIntro post={featured}/>
                <SectionBody shade={"rgba(246,247,244,.38)"} top={"60px"}><Workspaces/></SectionBody>
            </section>
            <section className={compStyles.news}>
                <SectionIntro post={news}/>
                <SectionBody><Scoop featuredOnly={true} scoops={newsScoops}/></SectionBody>
            </section>
            </>
        );
    }
}

export default () => {

    const featured = featuredWorkspacesStaticQuery();
    const news = ScoopsService.getIntroduction(newsStaticQuery());
    const newsScoops = ScoopsService.getScoops(newsStaticQuery());

    return (
        <Home featured={featured} news={news} newsScoops={newsScoops}/>
    )
}

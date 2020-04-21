/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news page.
 */

// Core dependencies
import React from "react";

// App dependencies
import Layout from "../components/layout";
import Scoops from "../components/scoops/scoops";
import {NewsStaticQuery} from "../hooks/newsQuery";
import * as ScoopsService from "../utils/scoops.service";

// Styles
import compStyles from "./news.module.css";

class News extends React.Component {

    render() {
        const {intro, scoops} = this.props;
        return (
            <Layout title={"News"}>
                <Scoops className={compStyles.news} intro={intro} scoops={scoops} type="news"/>
            </Layout>
        );
    }
}

export default () => {

    const intro = ScoopsService.getIntroduction(NewsStaticQuery());
    const newsScoops = ScoopsService.getScoops(NewsStaticQuery());

    return (
        <News intro={intro} scoops={newsScoops}/>
    )
}

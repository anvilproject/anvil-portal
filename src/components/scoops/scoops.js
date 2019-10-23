/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news scoops component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {newsStaticQuery} from "../../hooks/newsQuery";
import * as NewsService from "../../utils/news.service";
import ArticleBody from "../article/articleBody";
import Scoop from "./scoop";

// Styles

class Scoops extends React.Component {

    render() {
        const {scoop, post} = this.props,
            {html} = post;
        return (
            <ArticleBody html={html}>
                {scoop ? scoop.map((scoop, i) =>
                    <Scoop key={i} scoop={scoop}/>) : null}
            </ArticleBody>
        );
    }
}

export default () => {

    const newsPost = NewsService.getNewsIntroductionPost(newsStaticQuery());
    const newsScoop = NewsService.getNewsArticles(newsStaticQuery());

    return (
        <Scoops scoop={newsScoop} post={newsPost}/>
    );
}

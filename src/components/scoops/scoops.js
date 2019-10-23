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

class Scoops extends React.Component {

    render() {
        const {post} = this.props,
            {html} = post;
        return (
            <ArticleBody html={html}>
                <Scoop featuredOnly={false}/>
            </ArticleBody>
        );
    }
}

export default () => {

    const newsPost = NewsService.getNewsIntroductionPost(newsStaticQuery());

    return (
        <Scoops post={newsPost}/>
    );
}

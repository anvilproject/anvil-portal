/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news scoops component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ArticleBody from "../article/articleBody";
import Scoop from "./scoop";

class Scoops extends React.Component {

    render() {
        const {intro, scoops, type} = this.props,
            {html} = intro;
        return (
            <ArticleBody html={html}>
                <Scoop featuredOnly={false} scoops={scoops} type={type}/>
            </ArticleBody>
        );
    }
}

export default (props) => {

    const {intro, scoops, type} = props;

    return (
        <Scoops intro={intro} scoops={scoops} type={type}/>
    );
}

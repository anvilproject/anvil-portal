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
        const {compName, intro, scoops} = this.props,
            {html} = intro;
        return (
            <ArticleBody html={html}>
                <Scoop compName={compName} featuredOnly={false} scoops={scoops}/>
            </ArticleBody>
        );
    }
}

export default (props) => {

    const {compName, intro, scoops} = props;

    return (
        <Scoops compName={compName} intro={intro} scoops={scoops}/>
    );
}

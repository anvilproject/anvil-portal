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
        const {className, intro, scoops} = this.props,
            {htmlAst} = intro;
        return (
            <ArticleBody htmlAst={htmlAst}>
                <Scoop className={className} featuredOnly={false} scoops={scoops}/>
            </ArticleBody>
        );
    }
}

export default (props) => {

    const {className, intro, scoops} = props;

    return (
        <Scoops className={className} intro={intro} scoops={scoops}/>
    );
}

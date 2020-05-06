/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news scoops component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ArticleBody from "../article/article-body";
import Scoop from "./scoop";

class Scoops extends React.Component {

    render() {
        const {className, intro, scoops, type} = this.props,
            {htmlAst} = intro;
        return (
            <ArticleBody htmlAst={htmlAst}>
                <Scoop className={className} featuredOnly={false} scoops={scoops} type={type}/>
            </ArticleBody>
        );
    }
}

export default (props) => {

    const {className, intro, scoops, type} = props;

    return (
        <Scoops className={className} intro={intro} scoops={scoops} type={type}/>
    );
}

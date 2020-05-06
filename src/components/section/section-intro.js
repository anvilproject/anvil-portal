/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section intro component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Markdown from "../markdown/markdown";

// Styles
import compStyles from "./section-intro.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class SectionIntro extends React.Component {

    render() {
        const {end, htmlAst, post, start, stretch, wrap} = this.props,
            {frontmatter} = post || {},
            {title} = frontmatter || {};

        return (
            <div className={classNames(globalStyles.grid, globalStyles.g750, globalStyles.flex, compStyles.sectionIntro, {[compStyles.end]: end}, {[compStyles.start]: start}, {[compStyles.stretch]: stretch})}>
                {title ? <h1 className={classNames({[compStyles.wrap]: wrap})}>{title}</h1> : null}
                <Markdown className={compStyles.sectionContent}>{htmlAst}</Markdown>
            </div>
        );
    }
}

export default (props) => {

    const {post} = props,
        {htmlAst} = post;

    return (
        <SectionIntro htmlAst={htmlAst} {...props}/>
    )
}

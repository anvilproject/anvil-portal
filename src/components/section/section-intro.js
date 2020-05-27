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
import SectionSplash from "../section-splash/section-splash";

// Styles
import compStyles from "./section-intro.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class SectionIntro extends React.Component {

    render() {
        const {end, post, sectionTitle, start, stretch, wrap} = this.props,
            {frontmatter, htmlAst} = post || {},
            {title} = frontmatter || {},
            intro = title || sectionTitle;

        return (
            <div className={classNames(globalStyles.grid, globalStyles.g750, globalStyles.flex, compStyles.sectionIntro, {[compStyles.end]: end}, {[compStyles.start]: start}, {[compStyles.stretch]: stretch})}>
                <h1 className={classNames({[compStyles.wrap]: wrap})}>{intro}</h1>
                <SectionSplash end={end} start={start} stretch={stretch}>
                    {htmlAst ? <Markdown>{htmlAst}</Markdown> : null}
                </SectionSplash>
            </div>
        );
    }
}

export default SectionIntro;

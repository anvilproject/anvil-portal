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
import globalStyles from "../../styles/global.module.css";
import compStyles from "./sectionIntro.module.css";

let classNames = require("classnames");

class SectionIntro extends React.Component {

    render() {
        const {htmlAst} = this.props;
        return (
            <div className={classNames(globalStyles.sectionInner, globalStyles.centered)}>
                <Markdown className={compStyles.sectionIntro}>{htmlAst}</Markdown>
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

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section intro component.
 */

// Core dependencies
import React from "react";

// Styles
import globalStyles from "../../styles/global.module.css";
import contentStyles from "../article/articleBody.module.css";
import compStyles from "./sectionIntro.module.css";

let classNames = require("classnames");

class SectionIntro extends React.Component {

    render() {
        const {html} = this.props;
        return (
            <div className={classNames(globalStyles.sectionInner, globalStyles.centered)}>
                <div className={classNames(compStyles.sectionIntro, contentStyles.content)} dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        );
    }
}

export default (props) => {

    const {post} = props,
        {html} = post;

    return (
        <SectionIntro html={html} {...props}/>
    )
}

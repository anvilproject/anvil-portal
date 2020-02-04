/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL outline component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {OutlineStaticQuery} from "../../hooks/outlineQuery";
import * as OutlineService from "../../utils/outline.service";

// Styles
import compStyles from "./outline.module.css";

let classNames = require("classnames");

class Outline extends React.Component {

    render() {
        const {activeOutline, headings} = this.props;

        const Outline = (props) => {

            const {activeOutline, heading} = props;
            const outline = OutlineService.getOutline(heading);
            const {depth, anchor, label} = outline;
            const indent = depth === 3;

            return (
                <li>
                    <a className={classNames({[compStyles.indent]: indent}, {[compStyles.active]: activeOutline === anchor})}
                       href={anchor}>{label}</a>
                </li>
            )
        };

        return (
            <div className={compStyles.outline}>
                <ul>
                {headings ? headings.map((heading, i) =>
                    <Outline key={i} heading={heading} activeOutline={activeOutline}/>) : null}
                </ul>
            </div>
        );
    }
}

export default (props) => {

    const docPath = props.docPath;
    const headings = OutlineService.filterHtmlAstByHeading(OutlineStaticQuery(), docPath);

    return (
        <Outline headings={headings} {...props}/>
    );
}

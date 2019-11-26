/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL outline component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {outlineStaticQuery} from "../../hooks/outlineQuery";
import * as OutlineService from "../../utils/outline.service";

// Styles
import compStyles from "./outline.module.css";

let classNames = require("classnames");

class Outline extends React.Component {

    render() {
        const {headings} = this.props;

        const Outline = (props) => {

            const {heading} = props;
            const outline = OutlineService.getOutline(heading);
            const {depth, anchor, label} = outline;
            const indent = depth === 3;

            return (
                <li><a className={classNames({[compStyles.indent]: indent})} href={anchor}>{label}</a></li>
            )
        };

        return (
            <ul className={compStyles.outline}>
                {headings ? headings.map((heading, i) =>
                    <Outline key={i} heading={heading}/>) : null}
            </ul>
        );
    }
}

export default (props) => {

    const docPath = props.docPath;
    const headings = OutlineService.filterHtmlAstByHeading(outlineStaticQuery(), docPath);

    return (
        <Outline headings={headings}/>
    );
}

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - markdown component.
 */

// Core dependencies
import React from "react";
import rehypeReact from "rehype-react";

// App dependencies
import Button from "../button/button";
import Inscription from "../inscription/inscription";
import Hero from "../hero/hero";

// Styles
import compStyles from "./markdown.module.css";

let classNames = require("classnames");

class Markdown extends React.Component {

    render() {
        const {children, className} = this.props;
        const renderAst = new rehypeReact({
            createElement: React.createElement,
            components: { "button": Button, "inscription": Inscription, "hero": Hero }
        }).Compiler;
        return (
            <div id="content" className={classNames(className, compStyles.content)}>{renderAst(children)}</div>
        );
    }
}

export default Markdown;

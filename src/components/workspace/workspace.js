/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL workspace component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./workspace.module.css";

class Workspace extends React.Component {

    render() {
        const {workspace} = this.props,
            {frontmatter} = workspace,
            {description, title, url} = frontmatter || {};
        return (
            <div className={compStyles.workspace}>
                <div>{title}</div>
                <div>{description}</div>
                <div>{url}</div>
            </div>
        );
    }
}

export default Workspace;

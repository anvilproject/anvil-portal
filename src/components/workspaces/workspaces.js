/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL workspaces component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {featuredWorkspacesStaticQuery} from "../../hooks/featuredWorkspacesQuery";

// Styles
import contentStyles from "../article/articleBody.module.css";
import compStyles from "./workspaces.module.css";

let classNames = require("classnames");

class Workspaces extends React.Component {

    render() {
        const {post} = this.props,
            {frontmatter} = post,
            {linked} = frontmatter;
        return (
            <div className={classNames(compStyles.workspaces, contentStyles.content)}>
                {linked ? linked.map((p, i) =>
                    <div key={i} className={compStyles.workspace}
                         dangerouslySetInnerHTML={{__html: p.childMarkdownRemark.html}}/>) : null}
            </div>
        );
    }
}

export default () => {
    return (
        <Workspaces post={featuredWorkspacesStaticQuery()}/>
    );
}

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
import Markdown from "../markdown/markdown";

// Styles
import compStyles from "./workspaces.module.css";

class Workspaces extends React.Component {

    render() {
        const {post} = this.props,
            {frontmatter} = post,
            {linked} = frontmatter;
        return (
            <div className={compStyles.workspaces}>
                {linked ? linked.map((p, i) =>
                    <Markdown className={compStyles.workspace} key={i}>{p.childMarkdownRemark.htmlAst}</Markdown>) : null}
            </div>
        );
    }
}

export default () => {
    return (
        <Workspaces post={featuredWorkspacesStaticQuery()}/>
    );
}

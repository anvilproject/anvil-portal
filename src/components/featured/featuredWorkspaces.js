/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL featured workspaces component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {featuredWorkspacesStaticQuery} from "../../hooks/featuredWorkspacesQuery";

// Styles
import compStyles from "./featuredWorkspaces.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

class FeaturedWorkspaces extends React.Component {

    render() {
        const {post} = this.props,
            {html, frontmatter} = post,
            {linked} = frontmatter;
        return (
            <section>
                <div className={classNames(globalStyles.sectionInner, globalStyles.centered)}>
                    <div className={compStyles.featured}>
                        <h1>Featured Workspaces</h1>
                        <div className={"hero small"} dangerouslySetInnerHTML={{__html: html}}/>
                    </div>
                </div>
                <div className={compStyles.workspaces}>
                    <div className={globalStyles.container}>
                        {linked ? linked.map((p, i) => <div key={i} className={compStyles.workspace}>
                            <div className={"markdown"} dangerouslySetInnerHTML={{__html: p.childMarkdownRemark.html}}/>
                        </div>) : null}
                    </div>
                </div>
            </section>
        );
    }
}

export default () => {
    return (
        <FeaturedWorkspaces post={featuredWorkspacesStaticQuery()}/>
    );
}

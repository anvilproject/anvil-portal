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

// Images
import workspaces from "../../../images/workspaces.png";

// Styles
import compStyles from "./featuredWorkspaces.module.css";

const classNames = require("classnames");

class FeaturedWorkspaces extends React.Component {

    render() {
        const {post} = this.props,
            {frontmatter} = post,
            {linked} = frontmatter;
        return (
            <section>
                <div className={compStyles.featured}>
                    <h3>Featured Workspaces</h3>
                    <div className={compStyles.sep}/>
                    <div className={compStyles.workspaceImg}><img src={workspaces} alt="workspaces"/></div>
                </div>
                <div className={compStyles.workspaces}>
                    {linked ? linked.map((p, i) => <div key={i} className={compStyles.workspace}>
                        <a href={p.childMarkdownRemark.frontmatter.linkTo}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={classNames(compStyles.workspace, "markdown")}/>
                        <div dangerouslySetInnerHTML={{__html: p.childMarkdownRemark.html}}/>
                    </div>) : null}
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

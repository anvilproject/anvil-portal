/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL workspaces component.
 * Use of this component within markdown is possible.
 * Use the tag <workspaces></workspaces> but ensure it is closed.
 *
 * The prop "featured" is optional and will return workspaces with frontmatter featured=true.
 */

// Core dependencies
import React from "react";

// App dependencies
import {WorkspacesStaticQuery} from "../../hooks/workspaces-query";
import * as FeaturedService from "../../utils/featured.service";
import Workspace from "../workspace/workspace";

// Styles
import compStyles from "./workspaces.module.css";

class Workspaces extends React.Component {

    render() {
        const {workspaces} = this.props;
        return (
            <div className={compStyles.workspaces}>
                {workspaces.map((workspace, w) => <Workspace key={w} workspace={workspace}/>)}
            </div>
        );
    }
}

export default (props) => {

    const {featured} = props;
    const workspaces = FeaturedService.filterFeaturedPosts(featured, WorkspacesStaticQuery());

    return (
        workspaces ? <Workspaces workspaces={workspaces}/> : null
    );
}

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell project id component.
 * Renders projectId property from workspaces.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../../click-handler/click-handler";
import Tooltip from "../../tooltip/tooltip";
import * as RedirectService from "../../../utils/redirect.service";

// Styles
import compStyles from "./dashboard-table-row-cell-project-id.module.css";
import globalStyles from "../../../styles/global.module.css";

class DashboardTableRowCellProjectId extends React.Component {

    /**
     * Strip Anvil_xxx from beginning of project ID, if specified, where xxx is the consortium name. 
     * 
     * @returns {string}
     */
    getProjectDisplayText = (projectId) => {

        return projectId.replace(/^AnVIL_(CCDG|CMG|GTex)_/i, "");
    };

    render() {
        const {children, id} = this.props;
        const projectDisplayText = this.getProjectDisplayText(children);
        const linkTo = `https://anvil.terra.bio/#workspaces/anvil-datastorage/${children}`;

        return (
            <ClickHandler className={compStyles.link}
                          clickAction={() => RedirectService.redirect(linkTo, children)}
                          id={id}
                          tag={"td"}
                          label={children}>
                <Tooltip label={children}><span className={globalStyles.asLink}>{projectDisplayText}</span></Tooltip>
            </ClickHandler>
        );
    }
}

export default DashboardTableRowCellProjectId;

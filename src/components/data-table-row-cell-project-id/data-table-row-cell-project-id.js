/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table row cell project id component.
 * Renders projectId property from workspaces.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import Tooltip from "../tooltip/tooltip";
import * as RedirectService from "../../utils/redirect.service";

// Styles
import compStyles from "./data-table-row-cell-project-id.module.css";

class DataTableRowCellProjectId extends React.Component {

    render() {
        const {children, id} = this.props;
        const linkTo = `https://anvil.terra.bio/#workspaces/anvil-datastorage/${children}`;

        return (
            <ClickHandler className={compStyles.link}
                          clickAction={() => RedirectService.redirect(linkTo, children)}
                          id={id}
                          tag={"td"}
                          label={children}>
                <Tooltip label={children}>{children}</Tooltip>
            </ClickHandler>
        );
    }
}

export default DataTableRowCellProjectId;

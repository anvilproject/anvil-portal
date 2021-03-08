/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell gap id component.
 * Renders gapId property from workspaces.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../../click-handler/click-handler";
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";
import * as RedirectService from "../../../utils/redirect.service";

// Styles
import compStyles from "./dashboard-table-row-cell-gap-id.module.css";
import globalStyles from "../../../styles/global.module.css";

class DashboardTableRowCellGapId extends React.Component {

    render() {
        const {children, column, id} = this.props,
            {gapIdDisplay, studyUrl} = children || {};
        const cellValue = DashboardTableService.formatValue(gapIdDisplay, column);

        return (
            studyUrl ?
                <ClickHandler className={compStyles.link}
                              clickAction={() => RedirectService.redirect(studyUrl, gapIdDisplay)}
                              id={id}
                              tag={"td"}
                              label={gapIdDisplay}><span className={globalStyles.asLink}>{gapIdDisplay}</span></ClickHandler> :
                <td id={id}>{cellValue}</td>
        );
    }
}

export default DashboardTableRowCellGapId;

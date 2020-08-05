/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table row cell gap id component.
 * Renders gapId property from workspaces.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";
import * as RedirectService from "../../utils/redirect.service";

// Styles
import compStyles from "./data-table-row-cell-gap-id.module.css";

class DataTableRowCellGapId extends React.Component {

    render() {
        const {children, column, id} = this.props,
            {studyUrl, value} = children || {};
        const cellValue = DashboardTableService.formatValue(value, column);

        return (
            studyUrl ? <ClickHandler className={compStyles.link}
                                     clickAction={() => RedirectService.redirect(studyUrl, value)}
                                     id={id}
                                     tag={"td"}
                                     label={value}>{value}</ClickHandler> :
                <td id={id}>{cellValue}</td>
        );
    }
}

export default DataTableRowCellGapId;

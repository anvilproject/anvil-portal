/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table row cell data cell linked component.
 * Renders a data cell with a link.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";
import * as RedirectService from "../../utils/redirect.service";

// Styles
import compStyles from "./data-table-row-cell-data-cell-linked.module.css";

class DataTableRowCellDataCellLinked extends React.Component {

    render() {
        const {children, column, id} = this.props;
        const linkTo = DashboardTableService.getCellUrl(children, column);

        return (
            linkTo ? <ClickHandler className={compStyles.link}
                                   clickAction={() => RedirectService.redirect(linkTo, children)}
                                   id={id}
                                   tag={"td"}
                                   label={children}>{children}</ClickHandler> :
                <td id={id}>{children}</td>
        );
    }
}

export default DataTableRowCellDataCellLinked;

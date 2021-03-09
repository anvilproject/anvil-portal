/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell redirect component.
 * Renders a data cell with a link.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../../click-handler/click-handler";
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";
import * as RedirectService from "../../../utils/redirect.service";

// Styles
import compStyles from "./dashboard-table-row-cell-redirect.module.css";
import globalStyles from "../../../styles/global.module.css";

class DashboardTableRowCellRedirect extends React.Component {

    render() {
        const {children, column, id} = this.props;
        const linkTo = DashboardTableService.getCellUrl(children, column);

        return (
            linkTo ? <ClickHandler className={compStyles.link}
                                   clickAction={() => RedirectService.redirect(linkTo, children)}
                                   id={id}
                                   tag={"td"}
                                   label={children}>
                    <span className={globalStyles.asLink}>{children}</span>
                </ClickHandler> :
                <td id={id}>{children}</td>
        );
    }
}

export default DashboardTableRowCellRedirect;

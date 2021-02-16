/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell ellipsis component.
 * Returns a data cell styled with an ellipsis.
 */

// Core dependencies
import React from "react";

// App dependencies
import Tooltip from "../../tooltip/tooltip";

class DashboardTableRowCellEllipsis extends React.Component {

    render() {
        const {children, id} = this.props;
        const showEllipsis = children.length > 50;
        const truncated = `${children.substring(0, 47)}...`;

        return (
            <td id={id}>
                {showEllipsis ? <Tooltip label={children} multiline>{truncated}</Tooltip> : children}
            </td>
        );
    }
}

export default DashboardTableRowCellEllipsis;

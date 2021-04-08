/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell data types component.
 * Renders dataTypes property from workspaces.
 * TODO review uses.
 */

// Core dependencies
import React from "react";

// App dependencies
import Tooltip from "../../tooltip/tooltip";
import * as DashboardService from "../../../utils/dashboard/dashboard.service";
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";

class DashboardTableRowCellDataTypes extends React.Component {

    render() {
        const {children, id} = this.props;
        const dataTypes = children;
        const dataTypesExist = DashboardService.isArray(dataTypes);
        const last = dataTypes.length - 1;
        const showDataTypes = !!children;

        const DataType = (props) => {

            const {dataType, last} = props;
            const label = DashboardTableService.switchDataTypeToTooltipLabel(dataType);
            const displayValue = last ? dataType : `${dataType}; `;

            return (
                label ? <Tooltip label={label}>{displayValue}</Tooltip> : displayValue
            )
        };

        return (
            <td id={id}>
                {showDataTypes ?
                    dataTypesExist ?
                        dataTypes.map((dataType, d) =>
                            <DataType key={d} dataType={dataType} last={last === d}/>) :
                        <DataType dataType={children} last={true}/> : "--"}
            </td>
        );
    }
}

export default DashboardTableRowCellDataTypes;

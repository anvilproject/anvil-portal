/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table row cell values with tooltip component.
 * Renders any property that is an array of node type RowCellValueTooltip where
 * - "displayValue" is the display text
 * - "tooltipValue" is the tooltip value.
 */

// Core dependencies
import React from "react";

// App dependencies
import Tooltip from "../tooltip/tooltip";

class DataTableRowCellValuesTooltip extends React.Component {

    render() {
        const {children, id} = this.props;
        const cellData = children;
        const last = cellData.length - 1;

        const RowCellValueTooltip = (props) => {

            const {datum, last} = props,
                {displayValue, tooltipValue} = datum || {};
            const displayDatum = last ? displayValue : `${displayValue}, `;

            return (
                <Tooltip label={tooltipValue}>{displayDatum}</Tooltip>
            )
        };

        return (
            <td id={id}>
                {cellData.map((cellDatum, c) => <RowCellValueTooltip key={c} datum={cellDatum} last={last === c}/>)}
            </td>
        );
    }
}

export default DataTableRowCellValuesTooltip;

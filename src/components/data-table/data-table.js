/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./data-table.module.css";

class DataTable extends React.Component {

    render() {
        const {className, tableHeaders, tableRows} = this.props;

        const TableRow = (props) => {

            const {row} = props,
                {cohorts, demographics, diagnosis,families, files, program, projectId, publicData, samples, size, subjects} = row;

            return (
                <tr className={compStyles.row}>
                    <td>{program}</td>
                    {projectId ? <td>{projectId}</td> : null}
                    {publicData ? <td>{publicData}</td> : null}
                    {subjects ? <td className={compStyles.right}>{subjects}</td> : null}
                    <td className={compStyles.right}>{samples}</td>
                    {cohorts ? <td className={compStyles.right}>{cohorts}</td> : null}
                    <td className={compStyles.right}>{files}</td>
                    {demographics ? <td className={compStyles.right}>{demographics}</td> : null}
                    {diagnosis || diagnosis === null ? <td className={compStyles.right}>{diagnosis}</td> : null}
                    {families || families === null ? <td className={compStyles.right}>{families}</td> : null}
                    <td className={compStyles.right}>{size}</td>
                </tr>
            )
        };

        return (
            <table className={className}>
                <thead>
                    <tr className={compStyles.header}>
                        {tableHeaders.map((tableHeader, h) => <th key={h}>{tableHeader}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableRows.map((tableRow, r) => <TableRow key={r} row={tableRow}/>)}
                </tbody>
            </table>
        );
    }
}

export default (props) => {

    return (
        <DataTable {...props}/>
    )
}

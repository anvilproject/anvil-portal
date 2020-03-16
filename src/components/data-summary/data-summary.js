/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data summary component.
 * Use of this component within markdown is possible.
 * Use the tag <data-summary></data-summary> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["program", "subjects", "samples", "cohorts", "files", "size"];

let TABLE_ROWS = [
    {
        program: "CCDG",
        subjects: 59012,
        samples: 59012,
        cohorts: 68,
        files: 59013,
        size: 901.1
    },
    {
        program: "CMG",
        subjects: 6635,
        samples: 6634,
        cohorts: 28,
        files: 6643,
        size: 18.6
    },
    {
        program: "GTEx (v8)",
        subjects: 979,
        samples: 17382,
        cohorts: 1,
        files: 6643,
        size: 157.6
    },
    {
        program: "1000 Genomes",
        subjects: 2504,
        samples: 2504,
        cohorts: 1,
        files: 2504,
        size: 41.3
    },
];

class DataSummary extends React.Component {

    render() {
        return (
            <>
                <h2>Data Summary</h2>
                <DataTable className={tableStyles.summary} tableHeaders={TABLE_HEADERS} tableRows={TABLE_ROWS}/>
            </>
        );
    }
}

export default () => {

    return (
        <DataSummary/>
    )
}

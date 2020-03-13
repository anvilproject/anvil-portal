/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data detail component.
 * Use of this component within markdown is possible.
 * Use the tag <data-detail></data-detail> but ensure it is closed.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataTable from "../data-table/data-table";

// Styles
import tableStyles from "../data-table/data-table.module.css";

let TABLE_HEADERS = ["Programs", "Project Id", "Public", "Samples", "Files", "Demographic", "Diagnosis", "Family", "Size (TB)"];

let TABLE_ROWS = [
    {
        program: "All CCDG",
        projectId: "CCDG",
        publicData: "NA",
        samples: 59012,
        files: 59013,
        demographics: 59012,
        diagnosis: 4,
        families: 4998,
        size: 901.1
    },
    {
        program: "AnVIL_CCDG_Baylor_CVD_AFib_BioVU_WGS",
        projectId: "CCDG",
        publicData: "False",
        samples: 1122,
        files: 1122,
        demographics: 1122,
        diagnosis: null,
        families: null,
        size: 26.79
    },
    {
        program: "AnVIL_CCDG_Baylor_CVD_AFib_Groningen_WGS",
        projectId: "CCDG",
        publicData: "False",
        samples: 639,
        files: 639,
        demographics: 639,
        diagnosis: null,
        families: null,
        size: 13.92
    },
    {
        program: "AnVIL_CCDG_Baylor_CVD_EOCAD_BioMe_WGS",
        projectId: "CCDG",
        publicData: "False",
        samples: 1201,
        files: 1201,
        demographics: 1201,
        diagnosis: null,
        families: null,
        size: 102.66
    },
];

class DataDetail extends React.Component {

    render() {
        return (
            <>
                <h2>Data Detail</h2>
                <DataTable className={tableStyles.detail} tableHeaders={TABLE_HEADERS} tableRows={TABLE_ROWS}/>
            </>
        );
    }
}

export default () => {

    return (
        <DataDetail/>
    )
}

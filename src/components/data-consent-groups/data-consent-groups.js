/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data (study) consent group component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataStudySnapshotTable from "../data-study-snapshot-table/data-study-snapshot-table";

// Template variables
let TABLE_HEADERS = ["consentName", "consentStat"];

class DataConsentGroups extends React.Component {

    render() {
        const {consentGroups} = this.props;
        const title = "Consent Groups";
        return (
            <DataStudySnapshotTable tableHeaders={TABLE_HEADERS} tableRows={consentGroups} title={title}/>
        );
    }
}

export default DataConsentGroups;

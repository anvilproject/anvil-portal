/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data (study) consent group component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataStudyCardTable from "../data-study-card-table/data-study-card-table";

// Template variables
let TABLE_HEADERS = ["consentName", "consentStat"];

class DataConsentGroups extends React.Component {

    render() {
        const {consentGroup} = this.props,
            {consents} = consentGroup;
        const title = "Consent Groups";
        return (
            <DataStudyCardTable tableHeaders={TABLE_HEADERS} tableRows={consents} title={title}/>
        );
    }
}

export default DataConsentGroups;

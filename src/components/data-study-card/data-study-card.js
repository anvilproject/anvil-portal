/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data study card component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataConsentGroups from "../data-consent-groups/data-consent-groups";
import DataStudy from "../data-study/data-study";
import DataWorkspaces from "../data-workspaces/data-workspaces";

// Styles
import compStyles from "./data-study-card.module.css";

class DataStudiesCard extends React.Component {

    render() {
        const {study} = this.props,
            {consentGroups, workspaces} = study,
            {count, subjectsTotal} = study;
        return (
            <div className={compStyles.study}>
                <DataStudy study={study}/>
                <DataConsentGroups consentGroups={consentGroups}/>
                <DataWorkspaces count={count} subjectsTotal={subjectsTotal} workspaces={workspaces}/>
            </div>
        );
    }
}

export default DataStudiesCard;

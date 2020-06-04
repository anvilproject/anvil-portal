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
import DataStudyCardHeader from "../data-study-card-header/data-study-card-header";
import DataWorkspaces from "../data-workspaces/data-workspaces";
import ExpansionPanel from "../expansion-panel/expansion-panel";

// Styles
import compStyles from "./data-study-card.module.css";

class DataStudyCard extends React.Component {

    render() {
        const {study} = this.props,
            {consentGroup, workspaces} = study;
        const panelTitle = "Workspaces";
        return (
            <div className={compStyles.study}>
                <DataStudyCardHeader study={study}/>
                <ExpansionPanel panelTitle={panelTitle}>
                    <DataConsentGroups consentGroup={consentGroup}/>
                    <DataWorkspaces workspaces={workspaces}/>
                </ExpansionPanel>
            </div>
        );
    }
}

export default DataStudyCard;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard studies.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
import {DashboardStudyStaticQuery} from "../../hooks/dashboard-study-query";

/**
 * Returns the dashboard studies filtered by results from the search, if applicable.
 *
 * @param filterQuery
 * @param filterResults
 * @returns {*}
 */
export function getDashboardStudies(filterQuery, filterResults) {

    /* Filter studies by dataset search, if applicable. */
    return DashboardService.filterStudiesBySearchResults(DashboardStudyStaticQuery(), filterQuery, filterResults);
}

/**
 * Build the complete set of workspaces for the specified studies, combining both study and workspace details for each
 * workspace.
 */
export function buildStudiesWorkspaces(studies) {

    return studies.reduce((accum, study) => {

        // We currently don't have a direct mapping between diseases and workspaces. We can assume each study's diseases
        // apply to each workspace in the study, except for CMG (which we leave blank for now). Once we have direct
        // mapping between workspace and diseases, we can update this to use the workspace-specific values, including
        // for CMG.
        const consortia = study.consortia;
        const diseases = consortia === "CMG" ? [] : study.diseases;

        // Build up the workspace 
        const workspaces = study.workspaces.map((workspace) => {
            
            return {
                consortia,
                dbGapIdAccession: study.dbGapIdAccession,
                studyName: study.studyName,
                projectId: workspace.projectId,
                diseases,
                access: getAccessDisplayText(study, workspace),
                dataType: workspace.dataType,
                subjects: workspace.subjects
            };
        });

        return [
            ...accum,
            ...workspaces
        ];

    }, []);
}

/**
 * Return the access display text for the specified workspace:
 * - "Public" when access: "Public"
 * - "Consortia" when no dbGap Id, or no link for dbGap Id
 * - "Researcher" when neither "Public" nor "Consortia"
 */
function getAccessDisplayText(study, workspace) {

    if ( workspace.access === "Public"  ) {
        return workspace.access;
    }
    
    if ( !!study.dbGapIdAccession ) {
        return "Consortia";
    }
    
    return "Researcher";
}

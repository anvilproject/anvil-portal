/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard studies into FE model.
 */

// App dependencies
import * as DashboardSortService from "./dashboard-sort.service";
import {DashboardStudyStaticQuery} from "../../hooks/dashboard-study-query";
import {DashboardSubjectStaticQuery} from "../../hooks/dashboard-subject-query";
import * as DashboardDetailService from "../../utils/dashboard/dashboard-detail.service";

/**
 * Returns the formatted dashboard studies JSON.
 */
export function getDashboardStudies() {

    /* Build the studies dashboard. */
    const dashboardStudies = buildDashboardStudies();

    /* Return the sorted studies. */
    return DashboardSortService.sortDataByDuoTypes(dashboardStudies, "consortia", "studyName");
}

/**
 * Parse the dashboard studies JSON and build up FE-compatible model of data dashboard studies, to be displayed on the dashboard page.
 */
function buildDashboardStudies() {

    /* Get the db gap readiness dashboard details FE-model, and the studies and subject queries. */
    const studies = DashboardStudyStaticQuery();
    const subjects = DashboardSubjectStaticQuery();
    const workspaces = DashboardDetailService.getDashboardDetail(true);

    /* Build the studies dashboard. */
    return studies.map(study => {

        const dbGapId = study.dbGapId;
        const diseases = study.diseases;
        const studyName = study.name.longName;
        const subjectByStudy = subjects.find(subject => dbGapId.startsWith(subject.dbGapId));
        const workspacesByStudy = workspaces.filter(workspace => dbGapId.startsWith(workspace.dbGapId));
        const consentGroups = subjectByStudy.consentGroups;
        const access = findFirstWorkspaceNodeByType(workspacesByStudy, "access");
        const consortia = findFirstWorkspaceNodeByType(workspacesByStudy, "program");
        const studyWorkspaces = buildStudyWorkspaces(workspacesByStudy);
        const subjectsTotal = sumSubjectsValues(workspacesByStudy);

        return {
            access: access,
            consentGroups: consentGroups,
            consortia: consortia,
            count: subjectByStudy.count,
            dbGapId: dbGapId,
            diseases: diseases,
            studyName: studyName,
            subjectsTotal: subjectsTotal,
            workspaces: studyWorkspaces
        }
    });
}

/**
 * Returns workspaces summarized by its projectId and corresponding counts.
 *
 * @param workspacesByStudy
 */
function buildStudyWorkspaces(workspacesByStudy) {

    if ( workspacesByStudy ) {

        const studyWorkspaces = workspacesByStudy.map(workspace => {

            return {
                dataType: workspace.dataType,
                files: workspace.files,
                samples: workspace.samples,
                size: workspace.size,
                subjects: workspace.subjects,
                workspaceId: workspace.projectId
            }
        });

        return DashboardSortService.sortDataBySingularType(studyWorkspaces, "workspaceId")
    }
}

/**
 * Returns the first workspace's specified node value.
 *
 * @param workspacesByGapId
 * @param type
 * @returns {*}
 */
function findFirstWorkspaceNodeByType(workspacesByGapId, type) {

    if ( workspacesByGapId.length ) {

        return workspacesByGapId[0][type];
    }
}

/**
 * Sum the subjects counts.
 *
 * @param workspaces
 * @returns {*}
 */
function sumSubjectsValues(workspaces) {

    return workspaces.reduce((accum, workspace) => {
        accum += workspace.subjects;
        return accum;
    }, 0);
}


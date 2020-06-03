/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard studies into FE model.
 */

// App dependencies
import * as DashboardSortService from "./dashboard-sort.service";
import {DashboardStudyStaticQuery} from "../../hooks/dashboard-study-query";
import {DashboardSubjectDictionaryStaticQuery} from "../../hooks/dashboard-subject-dictionary-query";
import {DashboardSubjectReportStaticQuery} from "../../hooks/dashboard-subject-report-query";
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

    /* Get the db gap readiness dashboard details FE-model, and the studies and subject report and dictionary queries. */
    const studies = DashboardStudyStaticQuery();
    const subjectsDictionary = DashboardSubjectDictionaryStaticQuery();
    const subjectsReport = DashboardSubjectReportStaticQuery();
    const workspaces = DashboardDetailService.getDashboardDetail(true);

    /* Build the studies dashboard. */
    return studies.map(study => {

        /* Find the subject and dictionary consentId and filter workspaces, specified by dbGapIdAccession. */
        const dbGapIdAccession = study.dbGapIdAccession;
        const consentId = subjectsDictionary.find(dictionary => dbGapIdAccession.startsWith(dictionary.dbGapIdAccession)).variableConsentId;
        const subjectByStudy = subjectsReport.find(subject => dbGapIdAccession.startsWith(subject.dbGapIdAccession));
        const workspacesByStudy = workspaces.filter(workspace => dbGapIdAccession.startsWith(workspace.dbGapIdAccession));

        /* Assemble the study variables. */
        const access = findFirstWorkspaceNodeByType(workspacesByStudy, "access");
        const consents = findSubjectConsents(subjectByStudy, consentId);
        const consortia = findFirstWorkspaceNodeByType(workspacesByStudy, "program");
        const count = consents.consentsStat;
        const diseases = study.diseases;
        const studyName = study.name.longName;
        const subjectsTotal = sumSubjectsValues(workspacesByStudy);
        const studyWorkspaces = buildStudyWorkspaces(workspacesByStudy);

        return {
            access: access,
            consentGroup: consents,
            consortia: consortia,
            count: count,
            dbGapIdAccession: dbGapIdAccession,
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
 * @param workspacesByStudy
 * @param type
 * @returns {*}
 */
function findFirstWorkspaceNodeByType(workspacesByStudy, type) {

    if ( workspacesByStudy.length ) {

        return workspacesByStudy[0][type];
    }
}

/**
 * Returns the subject's consents specified by consentId.
 *
 * @param subjectByStudy
 * @param consentId
 */
function findSubjectConsents(subjectByStudy, consentId) {

    if ( subjectByStudy && subjectByStudy.variables ) {

        return subjectByStudy.variables.find(variable => variable && variable.consentsId === consentId);
    }
}

/**
 * Sum the subjects counts.
 *
 * @param workspacesByStudy
 * @returns {*}
 */
function sumSubjectsValues(workspacesByStudy) {

    return workspacesByStudy.reduce((accum, workspace) => {
        accum += workspace.subjects;
        return accum;
    }, 0);
}


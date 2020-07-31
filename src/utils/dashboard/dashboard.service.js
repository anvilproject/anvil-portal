/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard data.
 */

/**
 * Returns a filtered set of workspaces, specified by "consortia" or "dbGap" or "public".
 * "consortia" returns all private workspaces without a dbGapId accession.
 * "dbGap" returns all workspaces with an accession.
 * "public" [shared] returns all public workspaces without an accession.
 *
 * @param workspaces
 * @param consortia
 * @param dbGap
 * @param shared
 * @returns {*}
 */
export function filterDataByDBGapReadiness(workspaces, consortia, dbGap, shared) {

    if ( !!consortia && !!shared && !!dbGap ) {

        return workspaces;
    }

    /* Note: rehype-react custom component parsing of props. */
    /* A prop without a value will not be interpreted as true; instead, it will be passed as the empty string "". */
    return workspaces.filter(workspace => {

        const dbGapExists = !!workspace.dbGapIdAccession;

        /* Prop "consortia" - return all private workspaces without a dbGapId accession. */
        if ( consortia === "" ) {

            return ( workspace.access === "Private" ) && !dbGapExists;
        }

        /* Prop "dbGap" - return all workspaces with a dbGapId accession. */
        if ( dbGap === "" ) {

            return dbGapExists;
        }

        /* Prop "public" - return all public workspaces without a dbGapId accession. */
        if ( shared === "" ) {

            return ( workspace.access === "Public" ) && !dbGapExists;
        }

        return workspace;
    });
}

/**
 * Filters studies by results from the dataset search.
 *
 * @param studies
 * @param filterResults
 * @returns {*}
 */
export function filterStudiesBySearchResults(studies, filterResults) {

    if ( filterResults.length === 0 ) {

        return studies;
    }

    return studies.reduce((acc, study) => {

        if ( study.workspaces.some(workspace => filterResults.includes(workspace.projectId)) ) {

            const studyClone = Object.assign({}, study);

            studyClone.workspaces = study.workspaces.filter(workspace => filterResults.includes(workspace.projectId));

            acc.push(studyClone);

            return acc;
        }

        return acc;
    }, []);
}

/**
 * Filters workspaces by results from the dataset search.
 *
 * @param workspaces
 * @param filterResults
 * @returns {*}
 */
export function filterWorkspacesBySearchResults(workspaces, filterResults) {

    if ( filterResults.length === 0 ) {

        return workspaces;
    }

    return workspaces.filter(workspace => filterResults.includes(workspace.projectId));
}

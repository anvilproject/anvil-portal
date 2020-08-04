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

    return workspaces.filter(workspace => {

        const dbGapExists = !!workspace.dbGapIdAccession;

        /* Prop "consortia" - return all private workspaces without a dbGapId accession. */
        if ( parseProp(consortia) ) {

            return ( workspace.access === "Private" ) && !dbGapExists;
        }

        /* Prop "dbGap" - return all workspaces with a dbGapId accession. */
        if ( parseProp(dbGap) ) {

            return dbGapExists;
        }

        /* Prop "public" - return all public workspaces without a dbGapId accession. */
        if ( parseProp(shared) ) {

            return ( workspace.access === "Public" ) && !dbGapExists;
        }

        return workspace;
    });
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

/**
 * Returns a true value for any rehype-react custom prop.
 * i.e. A rehype-react prop without a value will not be interpreted as true; instead, it will be passed as the empty string "".
 *
 * @param value
 * @returns {boolean}
 */
export function parseProp(value) {

    return !!value || value === "";
}

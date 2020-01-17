/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic navigation service.
 * Filters navigation by document path.
 */

/**
 * Given a document path, return either its corresponding section or primary link.
 * Param x = 0 corresponds to section, x = 1 to primaryLink and so on.
 * @param docPath
 * @param x
 * @returns {*}
 */
export function getKeyOfPath(docPath, x) {

    return docPath.split('/')[x];
}

/**
 * Returns either the path (if there is one) or the key
 * @param link
 * @returns {*}
 */
export function getPath(link) {

    return link.path ? link.path : link.key ? link.key : '/';
}

/**
 * Given a path, return the navigation for the section.
 * @param siteMap
 * @param docPath
 * @returns {Array}
 */
export function getSectionNav(siteMap, docPath) {

    // Get section for the document path
    const section = siteMap.filter(n => n.key === getKeyOfPath(docPath, 1))[0];

    if (!section) {
        return [];
    }

    // Return error if no primary links for the section
    if (section && !section.primaryLinks) {
        throw new Error("No links for section: " + section);
    }

    // Return all primary links for the document section
    return section.primaryLinks;
}

/**
 * Returns a filtered siteMap that will exclude any documents in draft mode.
 *
 * @param siteMap
 * @param draftDocuments
 * @returns {*}
 */
export function removeDraftDocuments(siteMap, draftDocuments) {

    if ( !draftDocuments ) {

        // If there are no documents in draft mode, return the siteMap for all documents
        return siteMap;
    }
    else {

        // Return a filtered siteMap, excluding any documents in draft mode.
        // Draft mode is indicated by the frontmatter where "draft" is true.
        return siteMap.filter(page => {

            if (page.secondaryLinks) {
                page.secondaryLinks = page.secondaryLinks.filter(secondaryLink => {
                    return !draftDocuments.some(draftDoc => draftDoc.slug === secondaryLink.key)
                });
            }

            return !draftDocuments.some(draftDoc => draftDoc.slug === page.key);
        });
    }
}

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic navigation service.
 * Filters navigation by document path.
 */

/**
 * Filter navigation links by location (header, footer).
 * @param navigationLinks
 * @param locationType
 */
export function filterNavigationByLocation(navigationLinks, locationType) {

    return navigationLinks.filter(n => n.position && n.position.location === locationType);
}

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
 * Order navigation links.
 * @param navigationLinks
 */
export function orderNavigationLinks(navigationLinks) {

    return navigationLinks.sort((nav0, nav1) => {
        if (nav0.position.order > nav1.position.order) {
            return 1;
        }
        if (nav0.position.order < nav1.position.order) {
            return -1;
        }
        return 0;
    });
}


/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic navigation service.
 * Filters navigation by document path.
 */

// App dependencies
import {DraftStaticQuery} from "../hooks/draft-query";
import {NavStaticQuery} from "../hooks/nav-query";

/**
 * Return the navigation links for the specified docPath.
 *
 * @param docPath
 * @returns {*}
 */
export function getNav(docPath) {

    if ( docPath ) {

        /* Grab the section navigation. */
        const section = findSectionNavigation(docPath);

        /* Remove any documents in draft mode and return the navigation. */
        if ( section && Object.keys(section).length > 0 && section.primaryLinks ) {

            return removeDraftDocuments(section.primaryLinks);
        }
    }

    return [];
}

/**
 * Returns the section navigation for the specified docPath.
 *
 * @returns {{}}
 */
function findSectionNavigation(docPath) {

    /* Grab all sections navigation. */
    const sections = NavStaticQuery();

    if ( sections ) {

        /* Grab section key from the docPath. */
        const sectionKey = getKeyOfPath(docPath, 1);

        /* Find the corresponding section. */
        return sections.find(section => section.key === sectionKey);
    }

    return {};
}

/**
 * Given a document path, return either its corresponding section or primary link.
 * Param x = 0 corresponds to section, x = 1 to primaryLink and so on.
 *
 * @param docPath
 * @param x
 * @returns {*}
 */
function getKeyOfPath(docPath, x) {

    return docPath.split('/')[x];
}

/**
 * Returns true if the link is in draft mode.
 *
 * @param draftDocs
 * @param link
 */
function isDraftMode(draftDocs, link) {

    return draftDocs.some(draftDoc => draftDoc.slug === link.key);
}

/**
 * Returns a filtered siteMap that will exclude any documents in draft mode.
 *
 * @param navLinks
 * @returns {*}
 */
function removeDraftDocuments(navLinks) {

    /* Grab any draft documents. */
    const draftDocs = DraftStaticQuery();

    if ( draftDocs ) {

        /* Return a new collection of navigation links, excluding any documents in draft mode. */
        /* Draft mode is indicated by the frontmatter where "draft" is true. */
        return navLinks.reduce((acc, navLink) => {

            if ( !isDraftMode(draftDocs, navLink) ) {

                /* Clone the link. */
                const navLinkClone = Object.assign({}, navLink);
                const secondaryLinks = navLink.secondaryLinks;

                /* Filter any secondary links in draft mode. */
                if ( secondaryLinks ) {

                    navLinkClone.secondaryLinks = secondaryLinks.filter(sLink => !isDraftMode(draftDocs, sLink));
                }

                acc.push(navLinkClone);
            }

            return acc;
        }, []);
    }

    return navLinks;
}

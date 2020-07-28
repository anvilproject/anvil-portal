/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic header service.
 */

// App dependencies
import {HeaderStaticQuery} from "../hooks/header-query";

/**
 * Returns the header links specified by the page.
 * Any NCPI page will returns header links built specifically for NCPI pages, otherwise
 * the header links from the static query are returned.
 *
 * @param ncpiPost
 */
export function getHeaderLinks(ncpiPost) {

    /* Build header links for NCPI pages. */
    if ( ncpiPost ) {

        return [{name: "AnVIL", path: "/"}];
    }

    /* Return header links for all other pages. */
    return HeaderStaticQuery();
}

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site external link tracker component.
 * Handles Google Tag Manager tracking of external links.
 */

// Core dependencies
import {useEffect} from "react";

// App dependencies
import * as AnvilGTMService from "../../utils/anvil-gtm/anvil-gtm.service";
import * as DOMService from "../../utils/dom.service";

function SiteExternalLinkTracker(props) {

    const {children, refSite} = props;

    const onHandleTrackingExternalLinks = (e) => {

        const target = e.target;

        if ( !DOMService.isAnchor(target) ) {

            return;
        }

        const url = target.getAttribute("href");

        if ( DOMService.isHrefExternal(url) || DOMService.isMailTo(url) ) {

            const linkText = target.innerText;
            AnvilGTMService.trackExternalLinkClicked(url, linkText);
        }
    };

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Set up tracking of external links - add event listener. */
    useEffect(() => {

        const siteEl = refSite.current;
        siteEl.addEventListener("click", onHandleTrackingExternalLinks, {passive: true});

        return() => {

            siteEl.removeEventListener("click", onHandleTrackingExternalLinks, {passive: true});
        }
    }, [refSite]);

    return (
        children
    )
}

export default SiteExternalLinkTracker;

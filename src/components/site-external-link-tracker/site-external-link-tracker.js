/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site external link tracker component.
 * Handles Google Tag Manager tracking of external links.
 */

// Core dependencies
import { useCallback, useEffect } from "react";

// App dependencies
import * as AnvilGTMService from "../../utils/anvil-gtm/anvil-gtm.service";
import * as DOMService from "../../utils/dom.service";

// Styles
import * as socialStyles from "../socials/social/social.module.css";

function SiteExternalLinkTracker(props) {
  const { children, pageTitle, refSite } = props;

  const onHandleTrackingExternalLinks = useCallback(
    (e) => {
      const target = e.target;

      if (!DOMService.isAnchor(target)) {
        return;
      }

      const url = target.getAttribute("href");

      if (DOMService.isHrefExternal(url) || DOMService.isMailTo(url)) {
        /* Grab link text. */
        let linkText = target.innerText;

        /* If target belongs to <social> component, assign the page title to link text instead. */
        if (target.classList && target.value === socialStyles.social) {
          linkText = pageTitle;
        }

        AnvilGTMService.trackExternalLinkClicked(url, linkText);
      }
    },
    [pageTitle]
  );

  /* useEffect - componentDidMount, componentWillUnmount. */
  /* Set up tracking of external links - add event listener. */
  useEffect(() => {
    const siteEl = refSite.current;
    siteEl.addEventListener("click", onHandleTrackingExternalLinks, {
      passive: true,
    });

    return () => {
      siteEl.removeEventListener("click", onHandleTrackingExternalLinks, {
        passive: true,
      });
    };
  }, [onHandleTrackingExternalLinks, refSite]);

  return children;
}

export default SiteExternalLinkTracker;

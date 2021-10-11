/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic link redirect service.
 */

// Core dependencies
import { navigate } from "gatsby";

// App dependencies
import * as AnvilGTMService from "./anvil-gtm/anvil-gtm.service";
import * as DOMService from "./dom.service";

/**
 * Opens a new window for specified link and tracks any clicks to external site.
 *
 * @param linkTo
 * @param linkText
 */
export function redirect(linkTo, linkText) {
  if (linkTo && linkTo.startsWith("/")) {
    navigate(linkTo);
  } else {
    window.open(linkTo);
  }

  // Track click to external sites
  if (DOMService.isHrefExternal(linkTo) || DOMService.isMailTo(linkTo)) {
    AnvilGTMService.trackExternalLinkClicked(linkTo, linkText);
  }
}

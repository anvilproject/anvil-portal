/**
 * The AnVIL
 * https://www.anvilproject.org
 * 
 * Implement Gatsby's Browser APIs in this file.
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// App dependencies
const Bowser = require("bowser");
const lunr = require("lunr");

// Required for Edge, otherwise we get a "PerformanceObserver not defined" error 
require('@fastly/performance-observer-polyfill/polyfill');

// Template variables
const DASHBOARD_JSON = "/dashboard-index.json";

exports.onClientEntry = () => {

    // Exit if path is static page for browser not supported
    if ( window.location.pathname === "/browser-not-supported.html" || window.location.pathname === "/browser-not-supported-static.html" ) {

        return;
    }

    const browser = Bowser.getParser(window.navigator.userAgent);

    // List of unsupported browsers
    const browserNotSupported = browser.satisfies({

        ie: ">=6",
        edge: "~15",
        windows: {
            safari: ">=1",
        }
    });

    // List of browsers requiring an "image" only unsupoorted page due to css inadequacies.
    const browserCSSNotSupported = browser.satisfies({

        ie: "<=10",
    });

    // Redirect to static "browser not supported" page, should browser be unsupported by the AnVIL site.
    if ( browserNotSupported ) {

        if ( browserCSSNotSupported ) {

            window.location.replace("/browser-not-supported-static.html");
        }
        else {

            window.location.replace("/browser-not-supported.html");
        }
    }

    /* Build lunr search facility for data dashboard. */
    window.dashboardIndex = window.dashboardIndex || {};
    window.dashboardIndex = fetch(DASHBOARD_JSON)
        .then(res => res.json())
        .then(res => {
            window.dashboardIndex = lunr.Index.load(res);
            return window.dashboardIndex;
        })
        .catch((error) => {
            console.error("Error - dashboard index not generated", error);
        });
};

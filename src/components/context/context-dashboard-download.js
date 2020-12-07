/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for downloading dashboard dataset.
 */

// Core dependencies
import React from "react";

const ContextDashboardDownload = React.createContext({
    onHandleDownloadTSV: () => {},
});

export default ContextDashboardDownload;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard download tsv component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Button from "../../button/button";
import ContextDashboard from "../context-dashboard/context-dashboard";
import ContextDashboardDownload from "../context-dashboard-download/context-dashboard-download";
import Tooltip from "../../tooltip/tooltip";
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";

// Styles
import * as compStyles from "./dashboard-download-tsv.module.css";

function DashboardDownloadTSV() {
  const { onHandleDownloadTSV } = useContext(ContextDashboardDownload);
  const { entities, searchURL, tableHeadersEntities } =
    useContext(ContextDashboard);

  const onDownloadResults = () => {
    onHandleDownloadTSV(entities, tableHeadersEntities);
    AnvilGTMService.trackDashboardTSVDownloaded(searchURL);
  };

  return (
    <Tooltip label={"Download results in tsv format"}>
      <Button clickAction={() => onDownloadResults()}>
        <span className={compStyles.download}>Download TSV</span>
        <i className={"material-icons-round"}>save_alt</i>
      </Button>
    </Tooltip>
  );
}

export default DashboardDownloadTSV;

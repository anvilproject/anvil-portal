/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard download tsv component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Button from "../../button/button";
import ContextDashboard from "../context-dashboard/context-dashboard";
import ContextDashboardDownload from "../context-dashboard-download/context-dashboard-download";
import Tooltip from "../../tooltip/tooltip";

// Styles
import compStyles from "./dashboard-download-tsv.module.css";

function DashboardDownloadTSV() {

    const {onHandleDownloadTSV} = useContext(ContextDashboardDownload);
    const {tableHeadersEntities, workspaces} = useContext(ContextDashboard);

    const onDownloadResults = () => {

        onHandleDownloadTSV(workspaces, tableHeadersEntities);
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

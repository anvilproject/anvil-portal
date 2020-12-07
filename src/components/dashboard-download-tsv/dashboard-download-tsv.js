/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard download tsv component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Button from "../button/button";
import ContextDashboardDownload from "../context/context-dashboard-download";
import DashboardFilterContext from "../context/dashboard-filter-context";
import Tooltip from "../tooltip/tooltip";

// Styles
import compStyles from "./dashboard-download-tsv.module.css";

function DashboardDownloadTSV() {

    const {onHandleDownloadTSV} = useContext(ContextDashboardDownload);
    const {tableHeadersEntities, workspaces} = useContext(DashboardFilterContext);

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

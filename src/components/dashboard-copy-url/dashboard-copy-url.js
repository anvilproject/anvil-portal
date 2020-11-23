/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard copy url [to clipboard] component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Button from "../button/button";
import DashboardFilterContext from "../context/dashboard-filter-context";
import Tooltip from "../tooltip/tooltip";

// Styles
import compStyles from "./dashboard-copy-url.module.css";

function DashboardCopyURL() {

    const {searchURL} = useContext(DashboardFilterContext);

    const onCopyToClipboard = () => {

        navigator.clipboard.writeText(searchURL);
    };

    return (
        <Tooltip label={"Copy URL to clipboard"}>
            <Button clickAction={() => onCopyToClipboard()}>
                <span className={compStyles.copy}>Copy URL</span>
                <i className={"material-icons-round"}>copy</i>
            </Button>
        </Tooltip>
    );
}

export default DashboardCopyURL;

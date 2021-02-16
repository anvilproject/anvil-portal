/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dashboard downloads provider component.
 * Facilitates the download of the dashboard dataset.
 */

// Core dependencies
import React from "react";

// App dependencies
import ContextDashboardDownload from "../context-dashboard-download/context-dashboard-download";
import * as DashboardTableService from "../../../utils/dashboard/dashboard-table.service";
import * as NumberFormatService from "../../../utils/number-format.service";

function ProviderDashboardDownloads(props) {

    const {children} = props;

    const downloadDataset = (data, fileType) => {

        /* Create blob and new download element. */
        const blob = new Blob([data], {type: `text/${fileType}`});
        const downloadURL = window.URL.createObjectURL(blob);
        const downloadEl = document.createElement("a");

        /* Set attributes including href, and the download attribute. */
        downloadEl.setAttribute("hidden", "");
        downloadEl.setAttribute("href", downloadURL);
        downloadEl.setAttribute("download", `anvil-dataset-catalog-results.${fileType}`);

        /* Append download element, execute click event (downloads the file). */
        document.body.appendChild(downloadEl);
        downloadEl.click();

        /* Remove download element. */
        document.body.removeChild(downloadEl);
    };

    const reformatJSON = (dataset, headers, columnSeperator) => {

        if ( dataset ) {

            let rows = [];

            /* Handle headers - add to rows. */
            const rowHeaders = headers.map(header => DashboardTableService.switchDisplayColumnName(header));
            const rowHeaderStr = rowHeaders.join(columnSeperator);
            rows.push(rowHeaderStr);

            /* Handle each dataset row - add to rows. */
            dataset.reduce((acc, dataRow) => {

                /* Only add data that corresponds with the headers. */
                const row = headers.map(key => {

                    /* Grab the value. */
                    const datum = dataRow[key];

                    /* Handle a variety of value types. */
                    /* i.e. Type could be a number, object, array or null value. */
                    return parseDatum(datum, key);
                });

                const rowStr = row.join(columnSeperator);
                acc.push(rowStr);

                return acc;
            }, rows);

            /* Return the reformatted JSON. */
            return rows.join("\n");
        }

        return "";
    };

    const onHandleDownloadTSV = (dataset, headers) => {

        /* Build the dataset JSON, reformatted into a string. */
        /* Data is delimitered by "tab" i.e. "\t". */
        const reformattedDataset = reformatJSON(dataset, headers, "\t");

        /* Execute download of the tsv file. */
        downloadDataset(reformattedDataset, "tsv");
    };

    const parseDatum = (datum, key) => {

        /* Handle case where datum exists, or is a number (for when 0 is a valid value). */
        if ( datum || typeof datum === "number" ) {

            /* Handle case where datum is a number in TB. */
            if ( key === "sizeTB" || key === "size" ) {

                return NumberFormatService.formatSizeToTB(datum);
            }

            /* Handle case where datum is object. */
            /* e.g. key "diseases" is an array. */
            /* e.g. key "gapId" is an object with keys studyUrl and value. */
            if ( typeof datum === "object" ) {

                /* Handle case where datum is an array. */
                if ( Array.isArray(datum) ) {

                    return datum.join("; ") || "--";
                }
                /* Handle case where datum key is "gapId". */
                else if ( key === "gapId" ) {

                    return datum.value || "--";
                }
            }

            return datum;
        }

        return "--";
    };

    return (
        <ContextDashboardDownload.Provider value={{onHandleDownloadTSV}}>
            {children}
        </ContextDashboardDownload.Provider>
    )
}

export default ProviderDashboardDownloads;

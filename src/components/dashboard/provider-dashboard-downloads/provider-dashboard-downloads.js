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
import { DashboardEntityPropertyNameDisplay } from "../../../utils/dashboard/dashboard-entity-property-name-display.model";
import * as NumberFormatService from "../../../utils/number-format.service";

function ProviderDashboardDownloads(props) {
  const { children, dataset } = props;

  const downloadResultSet = (data, fileType) => {
    /* Create blob and new download element. */
    const blob = new Blob([data], { type: `text/${fileType}` });
    const downloadURL = window.URL.createObjectURL(blob);
    const downloadEl = document.createElement("a");

    /* Set attributes including href, and the download attribute. */
    downloadEl.setAttribute("hidden", "");
    downloadEl.setAttribute("href", downloadURL);
    downloadEl.setAttribute(
      "download",
      `${dataset}-dataset-catalog-results.${fileType}`
    );

    /* Append download element, execute click event (downloads the file). */
    document.body.appendChild(downloadEl);
    downloadEl.click();

    /* Remove download element. */
    document.body.removeChild(downloadEl);
  };

  const reformatJSON = (resultSet, headers, columnSeperator) => {
    if (resultSet) {
      let rows = [];

      /* Handle headers - add to rows. */
      const rowHeaders = headers.map(
        (header) => DashboardEntityPropertyNameDisplay[header] || header
      );
      const rowHeaderStr = rowHeaders.join(columnSeperator);
      rows.push(rowHeaderStr);

      /* Handle each result set row - add to rows. */
      resultSet.reduce((acc, resultRow) => {
        /* Only add data that corresponds with the headers. */
        const row = headers.map((key) => {
          /* Grab the value. */
          const datum = resultRow[key];

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

  const onHandleDownloadTSV = (resultSet, headers) => {
    /* Build the result set JSON, reformatted into a string. */
    /* Data is delimitered by "tab" i.e. "\t". */

    /* Insert "createdAt" field after "projectId" for downloading AnVIL workspaces only. */
    let headerKeys = [...headers];
    // if (dataset === "anvil") {
    //   const indexProjectId = headers.indexOf("projectId");
    //   const indexCreatedAt = indexProjectId + 1;
    //   headerKeys.splice(indexCreatedAt, 0, "createdAt");
    // }

    /* Insert "dbGapIdAccession" field after "gapId". */
    const indexGapId = headers.indexOf("gapId");
    const indexStudyAccession = indexGapId + 1;
    headerKeys.splice(indexStudyAccession, 0, "dbGapIdAccession");

    const reformattedResultSet = reformatJSON(resultSet, headerKeys, "\t");

    /* Execute download of the tsv file. */
    downloadResultSet(reformattedResultSet, "tsv");
  };

  const parseDatum = (datum, key) => {
    /* Handle case where datum exists, or is a number (for when 0 is a valid value). */
    if (datum || typeof datum === "number") {
      /* Handle case where datum is a number in TB. */
      if (key === "sizeTB" || key === "size") {
        return NumberFormatService.formatSizeToTB(datum);
      }

      /* Handle case where datum is object. */
      /* e.g. key "diseases" is an array. */
      /* e.g. key "gapId" is an object with keys studyUrl and value. */
      if (typeof datum === "object") {
        /* Handle case where datum is an array. */
        if (Array.isArray(datum)) {
          return datum.join("; ") || "--";
        } else if (key === "gapId") {
          /* Handle case where datum key is "gapId". */
          return datum.gapIdDisplay || "--";
        }
      }

      return datum;
    }

    return "--";
  };

  return (
    <ContextDashboardDownload.Provider value={{ onHandleDownloadTSV }}>
      {children}
    </ContextDashboardDownload.Provider>
  );
}

export default ProviderDashboardDownloads;

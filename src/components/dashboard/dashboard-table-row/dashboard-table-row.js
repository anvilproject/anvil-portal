/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardTableRowCell from "../dashboard-table-row-cell/dashboard-table-row-cell";

// Styles
import * as compStyles from "./dashboard-table-row.module.css";

function DashboardTableRow(props) {
  const { dataset, order, row } = props;
  const { studySlug } = row;

  return (
    <tr className={compStyles.row}>
      {order.map((key, c) => (
        <DashboardTableRowCell
          key={c}
          column={key}
          dataset={dataset}
          studySlug={studySlug}
        >
          {row[key]}
        </DashboardTableRowCell>
      ))}
    </tr>
  );
}

export default DashboardTableRow;

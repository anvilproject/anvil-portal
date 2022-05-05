/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell consent name component.
 * Renders consentName property from workspaces.
 */

// Core dependencies
import React from "react";

// App dependencies
import { ConsentName } from "../dashboard-study-summmary/dashboard-study-summary";
import Tooltip from "../../tooltip/tooltip";

// Styles
import { consent } from "./dashboard-table-row-cell-consent-name.module.css";

interface Props {
  cellValue: ConsentName;
  id: string;
}

export default function DashboardTableRowCellConsentName({
  cellValue,
  id,
}: Props): JSX.Element {
  const { long, short } = cellValue || {};
  return (
    <td id={id}>
      {long ? (
        <Tooltip label={long}>
          <span className={consent}>{short}</span>
        </Tooltip>
      ) : (
        short
      )}
    </td>
  );
}

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
    <td id={id}>{long ? <Tooltip label={long}>{short}</Tooltip> : short}</td>
  );
}

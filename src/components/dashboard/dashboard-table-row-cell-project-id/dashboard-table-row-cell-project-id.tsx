/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell project id component.
 * Renders projectId property from workspaces.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./dashboard-table-row-cell-project-id.module.css";

interface DashboardTableRowCellProjectIdProps {
  children: string;
  id: string;
}

function DashboardTableRowCellProjectId(
  props: DashboardTableRowCellProjectIdProps
) {
  const { children, id } = props;
  const href = `https://anvil.terra.bio/#workspaces/anvil-datastorage/${children}`;

  return (
    <a
      className={compStyles.projectId}
      href={href}
      id={id}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default DashboardTableRowCellProjectId;

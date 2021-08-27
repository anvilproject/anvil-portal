/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard table row cell study name component.
 * Renders studyName property and links to study detail page.
 */

// Core dependencies
import { navigate } from "gatsby";
import React, { useContext } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";

// Styles
import compStyles from "./dashboard-table-row-cell-study-name.module.css";

interface DashboardTableRowCellStudyNameProps {
  children: string;
  id: string;
  studySlug: string;
}

function DashboardTableRowCellStudyName(
  props: DashboardTableRowCellStudyNameProps
): JSX.Element {
  const { children, id, studySlug } = props;
  const { searchURL } = useContext(ContextDashboard);

  return studySlug ? (
    <td
      id={id}
      className={compStyles.studyName}
      onClick={() => {
        navigate(studySlug, {
          state: { locationHistory: searchURL },
        });
      }}
      role="presentation"
    >
      {children}
    </td>
  ) : (
    <td id={id}>{children}</td>
  );
}

export default DashboardTableRowCellStudyName;

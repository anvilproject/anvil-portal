/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardTable from "../dashboard-table/dashboard-table";

// Styles
import compStyles from "./dashboard-study-table.module.css";

export interface IStudyWorkspace {
  accessType: string;
  consentShortName: string;
  dataTypes: string[];
  diseases: string[];
  projectId: string;
  samples: number;
  size: number;
  studyDesigns: string[];
  subjects: number;
}

interface DashboardStudyTableProps {
  studyWorkspaces: IStudyWorkspace[];
}

function DashboardStudyTable(props: DashboardStudyTableProps): JSX.Element {
  const { studyWorkspaces } = props;
  const tableHeaders = [
    "projectId",
    "consentShortName",
    "diseases",
    "accessType",
    "studyDesigns",
    "dataTypes",
    "samples",
    "subjects",
    "size",
  ];
  return (
    <div className={compStyles.studyTable}>
      <h3>Terra Workspaces</h3>
      <p>
        This study has been divided into the following workspaces by consent
        codes and optionally the originating laboratory.
      </p>
      <DashboardTable tableHeaders={tableHeaders} tableRows={studyWorkspaces} />
    </div>
  );
}

export default DashboardStudyTable;

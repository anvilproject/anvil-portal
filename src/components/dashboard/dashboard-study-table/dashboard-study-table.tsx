/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard study table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { ConsentName } from "../dashboard-study-summmary/dashboard-study-summary";
import DashboardTable from "../dashboard-table/dashboard-table";

// Styles
import * as compStyles from "./dashboard-study-table.module.css";

export interface StudyWorkspace {
  accessType: string;
  consentName: ConsentName;
  dataTypes: string[];
  diseases: string[];
  projectId: string;
  samples: number;
  size: number;
  studyDesigns: string[];
  subjects: number;
}

interface DashboardStudyTableProps {
  studyWorkspaces: StudyWorkspace[];
}

function DashboardStudyTable(props: DashboardStudyTableProps): JSX.Element {
  const { studyWorkspaces } = props;
  const tableHeaders = [
    "projectId",
    "consentName",
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
      <DashboardTable
        dataset="anvil"
        tableHeaders={tableHeaders}
        tableRows={studyWorkspaces}
      />
    </div>
  );
}

export default DashboardStudyTable;

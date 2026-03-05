import { ReleaseUrlKey } from "./types";

export const URL_DISPLAY_ORDER: ReleaseUrlKey[] = [
  "submitterBlogPost",
  "dbGapUrl",
  "explorerUrl",
  "dataLibraryUrl",
  "dataWorkspaceUrl",
  "workspaceUrl",
];

export const URL_KEY_TO_LABEL_MAP: Record<ReleaseUrlKey, string> = {
  dataLibraryUrl: "Data Library",
  dataWorkspaceUrl: "Data Workspace",
  dbGapUrl: "Request Access",
  explorerUrl: "Data Explorer",
  submitterBlogPost: "Read Blog Post",
  workspaceUrl: "Terra Workspace",
};

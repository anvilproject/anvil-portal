import { DataAddition } from "../../../../data/types";

export type Props = Pick<DataAddition, ReleaseUrlKey>;

export type ReleaseUrlKey =
  | "dataLibraryUrl"
  | "dataWorkspaceUrl"
  | "dbGapUrl"
  | "explorerUrl"
  | "submitterBlogPost"
  | "workspaceUrl";

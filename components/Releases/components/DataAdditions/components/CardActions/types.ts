import { DataAddition } from "../../../../data/types";

export type Props = Pick<DataAddition, ReleaseUrlKey>;

export type ReleaseUrlKey =
  | "dataLibraryUrl"
  | "dbGapUrl"
  | "explorerUrl"
  | "submitterBlogPost"
  | "workspaceUrl";

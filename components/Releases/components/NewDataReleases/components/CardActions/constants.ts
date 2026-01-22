import { ReleaseUrlKey } from "./types";

export const URL_DISPLAY_ORDER: ReleaseUrlKey[] = [
  "submitterBlogPost",
  "dbGapUrl",
  "dataLibraryUrl",
  "explorerUrl",
];

export const URL_KEY_TO_LABEL_MAP: Record<ReleaseUrlKey, string> = {
  dataLibraryUrl: "Data Library",
  dbGapUrl: "Get Access",
  explorerUrl: "Explorer",
  submitterBlogPost: "Read Blog Post",
};

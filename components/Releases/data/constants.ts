import { ReleaseData } from "./types";

export const RELEASE_DATA_TO_FILE_MAP: Record<keyof ReleaseData, string> = {
  dataAdditions: "data-additions",
  dataModifications: "data-modifications",
  enhancements: "enhancements",
};

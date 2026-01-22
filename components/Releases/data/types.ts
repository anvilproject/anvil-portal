export interface BaseReleaseData {
  childPhsId?: string;
  duls: string[];
  phsId: string;
  studyName: string;
  studyUrl: string | null;
}

export type DataAddition = BaseReleaseData & {
  dataLibraryUrl: string;
  dbGapUrl: string;
  explorerUrl: string;
  releaseNotes: string;
  submitterBlogPost: string | null;
};

export type DataModification = BaseReleaseData & {
  releaseNotes: string;
};

export interface Enhancement
  extends Partial<Pick<BaseReleaseData, "duls" | "phsId">> {
  datasetsAffected: string[];
  description: string;
}

export interface ReleaseData {
  dataAdditions?: DataAddition[];
  dataModifications?: DataModification[];
  enhancements?: Enhancement[];
}

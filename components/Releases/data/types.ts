export interface BaseReleaseData {
  childPhsId?: string;
  duls: string[];
  phsId: string;
  studyName: string;
  studyUrl: string | null;
}

export type DataAddition = BaseReleaseData & {
  dataLibraryUrl: string | null;
  dbGapUrl: string;
  explorerUrl: string | null;
  releaseNotes: string;
  submitterBlogPost: string | null;
  workspaceUrl?: string;
};

export type DataModification = BaseReleaseData & {
  datasetsAffected: string[];
  releaseNotes: string;
};

export interface Enhancement {
  datasetsAffected: string[];
  description: string;
}

export interface ReleaseData {
  dataAdditions?: DataAddition[];
  dataModifications?: DataModification[];
  enhancements?: Enhancement[];
}

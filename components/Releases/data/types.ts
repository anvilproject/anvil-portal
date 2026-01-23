export interface BaseReleaseData {
  childPhsId?: string;
  description: string;
  duls: string[];
  phsId: string;
  studyName: string;
  studyUrl: string | null;
}

export type DataAddition = BaseReleaseData & {
  dataLibraryUrl: string | null;
  dbGapUrl: string;
  explorerUrl: string | null;
  submitterBlogPost: string | null;
  workspaceUrl?: string;
};

export type DataModification = BaseReleaseData & {
  datasetsAffected: string[];
};

export interface Enhancement {
  datasetsAffected?: string[];
  description: string;
}

export interface ReleaseData {
  dataAdditions?: DataAddition[];
  dataModifications?: DataModification[];
  enhancements?: Enhancement[];
}

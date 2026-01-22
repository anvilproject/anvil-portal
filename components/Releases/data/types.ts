export interface DataAddition {
  childPhsId?: string;
  dataLibraryUrl: string;
  dbGapUrl: string;
  duls: string[];
  explorerUrl: string;
  phsId: string;
  releaseNotes: string;
  studyName: string;
  studyUrl: string | null;
  submitterBlogPost: string | null;
}

export interface DataModification {
  dataLibraryUrl?: string;
  deletedWorkspaces?: string[];
  duls: string[];
  explorerUrl?: string;
  phsId: string;
  releaseNotes: string;
  studyName: string;
  studyUrl: string | null;
}

export interface Enhancement {
  datasetsAffected: string[];
  description: string;
  duls?: string[];
  phsId?: string;
}

export interface ReleaseData {
  dataAdditions?: DataAddition[];
  dataModifications?: DataModification[];
  enhancements?: Enhancement[];
}

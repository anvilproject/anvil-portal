/**
 * Publication entity representing a paper citing the main AnVIL paper.
 */
export interface Publication {
  authors: string[];
  citationCount: number;
  doi: string;
  journal: string;
  publisher: string;
  recencyBucket: string;
  title: string;
  year: number;
}

/**
 * Raw publication data as stored in the static JSON file.
 */
export interface PublicationInput {
  authors: string[];
  citationCount: number;
  doi: string;
  journal: string;
  publisher: string;
  title: string;
  year: number | null;
}

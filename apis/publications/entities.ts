/**
 * Publication entity representing a paper citing the main AnVIL paper.
 */
export interface Publication {
  authors: string[];
  citationCount: number;
  doi: string;
  journal: string;
  pmid: string | null;
  publisher: string;
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
  pmid: string | null;
  publisher: string;
  title: string;
  year: number | null;
}

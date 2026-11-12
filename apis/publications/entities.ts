/**
 * Publication entity representing a paper citing the main AnVIL paper.
 */
export interface Publication {
  authors: string[];
  citationCount: number;
  doi: string;
  journal: string;
  pmid: string | null;
  publicationDay: number | null;
  publicationMonth: number | null;
  publicationTimestamp: number;
  publicationYear: number;
  publisher: string;
  title: string;
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
  publicationDay: number | null;
  publicationMonth: number | null;
  publicationTimestamp: number;
  publicationYear: number;
  publisher: string;
  title: string;
}

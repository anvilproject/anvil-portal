/**
 * Publication entity representing a paper citing the main AnVIL paper.
 */
export type Publication = PublicationFields & PublicationDateParts;

/**
 * Month and day of a publication date; a day is only given with a month.
 */
export type PublicationDateParts =
  | { publicationDay: null; publicationMonth: null }
  | { publicationDay: number | null; publicationMonth: number };

/**
 * Publication fields other than the month and day of the publication date.
 */
export interface PublicationFields {
  authors: string[];
  citationCount: number;
  doi: string;
  journal: string;
  pmid: string | null;
  publicationTimestamp: number;
  publicationYear: number;
  publisher: string;
  title: string;
}

/**
 * Raw publication data as stored in the static JSON file.
 */
export type PublicationInput = PublicationFields & PublicationDateParts;

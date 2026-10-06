import type { Citation } from "../../../../common/entities";
import { MAX_AUTHORS } from "./constants";

/**
 * Returns the citation as a string.
 * @param citation - Citation.
 * @param isTruncated - Whether only the first authors are shown, followed by "et al.".
 * @returns citation as a string.
 */
export function getCitation(citation: Citation, isTruncated: boolean): string {
  const { authors, doi, journal, year } = citation;
  return `${joinAuthors(authors, isTruncated)}${isTruncated ? ", et al." : "."} (${year}). ${journal}. ${doi}.`;
}

/**
 * Returns the authors as a string.
 * @param authors - Authors.
 * @param isTruncated - Whether only the first authors are shown.
 * @returns authors as a string.
 */
function joinAuthors(authors: string[], isTruncated: boolean): string {
  return (isTruncated ? authors.slice(0, MAX_AUTHORS) : authors).join(", ");
}

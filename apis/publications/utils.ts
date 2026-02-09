import { Publication, PublicationInput } from "./entities";

/**
 * Computes a recency bucket label from a publication year.
 * @param year - Publication year.
 * @returns Recency bucket label.
 */
function getRecencyBucket(year: number | null): string {
  if (!year) return "Unknown";
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  if (age <= 0) return "Last year";
  if (age === 1) return "1–2 years ago";
  if (age === 2) return "2–3 years ago";
  return "Older";
}

/**
 * Maps raw publication input to a Publication entity with computed fields.
 * @param input - Raw publication data from the static JSON file.
 * @returns Publication entity with recencyBucket computed.
 */
export function publicationInputMapper(input: PublicationInput): Publication {
  return {
    ...input,
    recencyBucket: getRecencyBucket(input.year),
    year: input.year ?? 0,
  };
}

/**
 * Returns the unique identifier for a publication.
 * @param publication - Publication entity.
 * @returns The DOI string.
 */
export function getPublicationId(publication: Publication): string {
  return publication.doi;
}

/**
 * Returns the title of a publication.
 * @param publication - Publication entity.
 * @returns The title string, or undefined if no publication.
 */
export function getPublicationTitle(
  publication?: Publication
): string | undefined {
  return publication?.title;
}

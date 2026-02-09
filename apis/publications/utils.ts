import { Publication, PublicationInput } from "./entities";

/**
 * Maps raw publication input to a Publication entity.
 * @param input - Raw publication data from the static JSON file.
 * @returns Publication entity with year defaulted to 0 if null.
 */
export function publicationInputMapper(input: PublicationInput): Publication {
  return {
    ...input,
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

import type { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { PUBLICATIONS_ENTITY_ROUTE } from "../../../../../../../apis/publications/constants";
import type { PublicationInput } from "../../../../../../../apis/publications/entities";
import { readStaticLoadFile } from "../../../../../../../utils/readFile";
import type { PublicationSectionCard } from "./entities";

const MAX_PUBLICATION_CARDS = 3;

/**
 * Returns the publication section cards for the most recent publications in the citations list.
 * @param entities - Entity configs.
 * @returns publication section cards, most recent first.
 */
export function buildPublicationSectionCards(
  entities: EntityConfig[]
): PublicationSectionCard[] {
  const entityConfig = getEntityConfig(entities, PUBLICATIONS_ENTITY_ROUTE);
  return readStaticLoadFile<PublicationInput>(entityConfig)
    .filter(hasCitationFields)
    .sort((a, b) => b.publicationTimestamp - a.publicationTimestamp)
    .slice(0, MAX_PUBLICATION_CARDS)
    .map(mapPublicationToCard);
}

/**
 * Returns true if the publication has the fields needed to sort and render a card citation; scraped citation data may be missing them.
 * @param publication - Publication from the citations list.
 * @returns true if the publication has a title, journal, at least one named author, a year and a publication timestamp.
 */
function hasCitationFields(publication: PublicationInput): boolean {
  const { authors, journal, publicationTimestamp, publicationYear, title } =
    publication;
  return Boolean(
    title &&
    journal &&
    authors.some(Boolean) &&
    publicationYear > 0 &&
    Number.isFinite(publicationTimestamp)
  );
}

/**
 * Maps a citations list publication to a publication section card, linking to the publication DOI and dropping blank author names.
 * @param publication - Publication from the citations list.
 * @returns publication section card.
 */
function mapPublicationToCard(
  publication: PublicationInput
): PublicationSectionCard {
  const { authors, doi, journal, publicationYear, publisher, title } =
    publication;
  return {
    cardLink: doi,
    citation: {
      authors: authors.filter(Boolean),
      doi,
      journal,
      publisher,
      year: String(publicationYear),
    },
    title,
  };
}

import {
  PublicationCard,
  PUBLICATION_CATEGORY,
} from "../../../Home/components/Section/components/SectionPublications/common/entities";
import { Card } from "../../../Home/components/Section/components/SectionPublications/components/Publications/components/Card/card";
import { PublicationView } from "./publications.styles";

interface PublicationsProps {
  publicationCategory: PUBLICATION_CATEGORY;
  publications: PublicationCard[];
}

export const Publications = ({
  publicationCategory,
  publications,
}: PublicationsProps): JSX.Element => {
  const categorizedPublications = getCategorizedPublications(
    publications,
    publicationCategory
  );
  return (
    <PublicationView>
      {categorizedPublications.map((publication) => (
        <Card key={publication.title} card={publication} />
      ))}
    </PublicationView>
  );
};

/**
 * Returns the publications for the given publication category.
 * @param publications - Publications.
 * @param publicationCategory - Publication category.
 * @returns publications for the given publication category.
 */
function getCategorizedPublications(
  publications: PublicationCard[],
  publicationCategory: PUBLICATION_CATEGORY
): PublicationCard[] {
  return publications.filter(
    ({ category }) => category === publicationCategory
  );
}

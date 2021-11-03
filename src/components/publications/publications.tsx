/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL publications component.
 * Renders publications in card format, from the specified publication category.
 * Use of this component within markdown is possible.
 *
 * Children
 * --------
 * None.
 *
 * Props
 * -----
 * - category: publication category; possible values as defined by PublicationCategory. Default is "ON_ANVIL".
 *
 * Example
 * -------
 * <Publications category="ABOUT_ANVIL"></Publications>
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { PublicationCloudStaticQuery } from "../../hooks/publication-cloud-query";
import PublicationCard, {
  IPublicationCard,
} from "../home/publication-card/publication-card";
import { sectionCards } from "../home/section-publication/section-publication.module.css";
import PublicationCategory from "./publication-category/publication-category";

interface Props {
  category?: string;
}

const Publications: FC<Props> = ({
  category = PublicationCategory.ON_ANVIL,
}: Props): JSX.Element => {
  const frontmatter = PublicationCloudStaticQuery();
  const publicationCards: IPublicationCard[] = frontmatter.publications;

  return (
    <div className={sectionCards}>
      {publicationCards
        .filter((card) => card.category === category)
        .map((card) => (
          <PublicationCard key={card.title} publicationCard={card} />
        ))}
    </div>
  );
};

Publications.defaultProps = {
  category: PublicationCategory.ON_ANVIL,
};

export default Publications;

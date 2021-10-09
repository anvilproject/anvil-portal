/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section publication component.
 */

// Core dependencies
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { FC } from "react";

// App dependencies
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import ButtonCta from "../../button-cta/button-cta";
import { PublicationCloudStaticQuery } from "../../../hooks/publication-cloud-query";
import PublicationCard, {
  IPublicationCard,
} from "../publication-card/publication-card";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import SectionContentPosition from "../section/section-content-position/section-content-position";

// Styles
import { sectionCards } from "./section-publication.module.css";

const SectionPublication: FC = (): JSX.Element => {
  const [publicationCards, media] = PublicationCloudStaticQuery() as [
    IPublicationCard[],
    IGatsbyImageData
  ];
  const img = media ? getImage(media) : undefined;
  return (
    <Section>
      {/* Section Content - LHS. */}
      <SectionContent position={SectionContentPosition.DEFAULT_LEFT}>
        {/* Heading */}
        <>Recent Publications</>
        {/* Content */}
        <div className={sectionCards}>
          {publicationCards.map((card) => (
            <PublicationCard key={card.title} publicationCard={card} />
          ))}
        </div>
        {/* CTAs */}
        <>
          <ButtonCta
            attributeHREF="/"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            All Publications
          </ButtonCta>
          <ButtonCta
            attributeHREF="/"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Cite AnVIL
          </ButtonCta>
        </>
      </SectionContent>
      {/* Section Content - RHS - Media. */}
      <SectionContent position={SectionContentPosition.MEDIA_RIGHT}>
        {/* Heading */}
        {null}
        {/* Content */}
        {img ? <GatsbyImage alt="publication" image={img} /> : null}
        {/* CTAs */}
        {null}
      </SectionContent>
    </Section>
  );
};

export default SectionPublication;

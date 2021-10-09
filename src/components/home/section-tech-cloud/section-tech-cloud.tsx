/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section tech cloud component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { ICard } from "../../card/card";
import { TechCloudStaticQuery } from "../../../hooks/tech-cloud-query";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import SectionType from "../section/section-type/section-type";
import TechCard from "../tech-card/tech-card";

// Styles
import { sectionCards } from "./section-tech-cloud.module.css";

const SectionTechCloud: FC = (): JSX.Element => {
  const techCards: ICard[] = TechCloudStaticQuery();
  return (
    <Section sectionType={SectionType.BANNER}>
      <SectionContent>
        {/* Heading */}
        {null}
        {/* Content */}
        <div className={sectionCards}>
          {techCards.map((card) => (
            <TechCard key={card.title} techCard={card} />
          ))}
        </div>
        {/* CTAs */}
        {null}
      </SectionContent>
    </Section>
  );
};

export default SectionTechCloud;

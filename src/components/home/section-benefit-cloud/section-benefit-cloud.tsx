/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section benefit cloud component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import BenefitCard from "../benefit-card/benefit-card";
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";
import { BenefitCloudStaticQuery } from "../../../hooks/benefit-cloud-query";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";

// Styles
import { sectionCards, sectionHero } from "./section-benefit-cloud.module.css";

const SectionBenefitCloud: FC = (): JSX.Element => {
  const frontmatter = BenefitCloudStaticQuery();
  const hero = frontmatter.sectionSubHeader;
  const cards: ICard[] = frontmatter.benefits;
  return (
    <Section>
      <SectionContent>
        {/* Heading */}
        <>
          Collaborate in a secure, cost-effective, scalable cloud-based
          environment
        </>
        {/* Hero */}
        {hero ? <h4 className={sectionHero}>{hero}</h4> : null}
        {/* Content */}
        <div className={sectionCards}>
          {cards.map((card) => (
            <BenefitCard key={card.title} benefitCard={card} />
          ))}
        </div>
        {/* CTAs */}
        <>
          <ButtonCta
            attributeHREF="/learn"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.PRIMARY}
          >
            Get Started
          </ButtonCta>
          <ButtonCta
            attributeHREF="/overview"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Learn More
          </ButtonCta>
        </>
      </SectionContent>
    </Section>
  );
};

export default SectionBenefitCloud;

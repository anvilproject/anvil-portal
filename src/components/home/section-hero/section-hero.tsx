/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section hero component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";
import Carousel from "../carousel/carousel";
import { SlideStaticQuery } from "../../../hooks/slide-query";
import Section from "../section/section";
import SectionType from "../section/section-type/section-type";

// Styles
import {
  heroCTAs,
  heroMain,
  heroSubMain,
  heroSubTitle,
  heroTitle,
} from "./section-hero.module.css";

const SectionHero: FC = (): JSX.Element => {
  const slides: ICard[] = SlideStaticQuery();
  return (
    <Section sectionType={SectionType.HERO}>
      <div className={heroMain}>
        <div className={heroTitle}>
          Migrate Your Genomic Research to the Cloud
        </div>
        <div className={heroSubTitle}>
          Secure, cost-effective, genomic analysis at scale.
        </div>
        <div className={heroCTAs}>
          <ButtonCta
            attributeHREF="/overview"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.PRIMARY}
          >
            Get Started
          </ButtonCta>
          <ButtonCta
            attributeHREF="/learn"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Learn More
          </ButtonCta>
        </div>
      </div>
      <div className={heroSubMain}>
        <Carousel slides={slides} />
      </div>
    </Section>
  );
};

export default SectionHero;

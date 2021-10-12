/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section dataset cloud component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";
import DatasetCard from "../dataset-card/dataset-card";
import { DatasetCloudStaticQuery } from "../../../hooks/dataset-cloud-query";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import Stats from "../../stats/stats";

// Styles
import { datasetStats, sectionCards } from "./section-dataset-cloud.module.css";

const SectionDatasetCloud: FC = (): JSX.Element => {
  const datasetCards: ICard[] = DatasetCloudStaticQuery();

  return (
    <Section>
      <SectionContent>
        {/* Heading */}
        <>Access diverse, open and controlled access cloud-hosted datasets</>
        {/* Content */}
        <>
          {/* Stats */}
          <div className={datasetStats}>
            <Stats />
          </div>
          <div className={sectionCards}>
            {datasetCards.map((datasetCard) => (
              <DatasetCard key={datasetCard.title} datasetCard={datasetCard} />
            ))}
          </div>
        </>
        {/* CTAs */}
        <>
          <ButtonCta
            attributeHREF="/overview/data-consortia"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Consortia Roadmap
          </ButtonCta>
          <ButtonCta
            attributeHREF="/data"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Explore Datasets
          </ButtonCta>
          <ButtonCta
            attributeHREF="/learn/data-submitters/submission-guide/data-submitters-overview"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Contribute Data
          </ButtonCta>
        </>
      </SectionContent>
    </Section>
  );
};

export default SectionDatasetCloud;

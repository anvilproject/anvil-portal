/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section dataset cloud component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { DatasetCloudStaticQuery } from "../../../hooks/dataset-cloud-query";
import { getDatasetsEnvironmentUrl } from "../../../utils/environment/environment.service";
import ButtonCta from "../../button-cta/button-cta";
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import { ICard } from "../../card/card";
import Stats from "../../stats/stats";
import { Target } from "../../target/target.model";
import DatasetCard from "../dataset-card/dataset-card";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";

// Styles
import { sectionHero } from "../section-workspace-cloud/section-workspace-cloud.module.css";
import { datasetStats, sectionCards } from "./section-dataset-cloud.module.css";

const SectionDatasetCloud: FC = (): JSX.Element => {
  const frontmatter = DatasetCloudStaticQuery();
  const datasetCards: ICard[] = frontmatter.datasets;
  const hero = frontmatter.sectionSubHeader;

  return (
    <Section>
      <SectionContent>
        {/* Heading */}
        <>Access diverse, open and controlled access, cloud-hosted datasets</>
        {/* Hero */}
        <div className={sectionHero}>
          <div className={datasetStats}>
            <Stats />
          </div>
          {hero ? <h4>{hero}</h4> : null}
        </div>
        {/* Content */}
        <>
          <div className={sectionCards}>
            {datasetCards.map((datasetCard) => (
              <DatasetCard key={datasetCard.title} datasetCard={datasetCard} />
            ))}
          </div>
        </>
        {/* CTAs */}
        <>
          <ButtonCta
            attributeHREF={`${getDatasetsEnvironmentUrl()}consortia`}
            attributeTarget={Target.SELF}
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Consortia Roadmap
          </ButtonCta>
          <ButtonCta
            attributeHREF={`${getDatasetsEnvironmentUrl()}data/consortia/`}
            attributeTarget={Target.SELF}
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

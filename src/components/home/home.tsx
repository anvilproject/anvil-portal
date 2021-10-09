/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL homepage component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import SectionBenefitCloud from "./section-benefit-cloud/section-benefit-cloud";
import SectionDatasetCloud from "./section-dataset-cloud/section-dataset-cloud";
import SectionHero from "./section-hero/section-hero";
import SectionLatestUpdates from "./section-latest-updates/section-latest-updates";
import SectionPublication from "./section-publication/section-publication";
import SectionTechCloud from "./section-tech-cloud/section-tech-cloud";
import SectionWorkspaceCloud from "./section-workspace-cloud/section-workspace-cloud";

const Home: FC = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionTechCloud />
      <SectionDatasetCloud />
      <SectionWorkspaceCloud />
      <SectionBenefitCloud />
      <SectionLatestUpdates />
      <SectionPublication />
    </>
  );
};

export default Home;

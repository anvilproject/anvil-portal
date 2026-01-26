import { JSX } from "react";
import { SectionAnalysisPortals } from "../../components/Home/components/Section/components/SectionAnalysisPortals/sectionAnalysisPortals";
import { SectionCloudEnvironment } from "../../components/Home/components/Section/components/SectionCloudEnvironment/sectionCloudEnvironment";
import { SectionDatasets } from "../../components/Home/components/Section/components/SectionDatasets/sectionDatasets";
import { SectionHero } from "../../components/Home/components/Section/components/SectionHero/sectionHero";
import { SectionPublications } from "../../components/Home/components/Section/components/SectionPublications/sectionPublications";
import { SectionUpdates } from "../../components/Home/components/Section/components/SectionUpdates/sectionUpdates";
import { SectionWorkspaces } from "../../components/Home/components/Section/components/SectionWorkspaces/sectionWorkspaces";
import { SectionDivider } from "../../components/Home/components/Section/section.styles";
import { SectionExplore } from "../../components/Home/components/Section/components/SectionExplore/sectionExplore";

export const HomeView = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionAnalysisPortals />
      <SectionDivider flexItem />
      <SectionExplore />
      <SectionDatasets />
      <SectionDivider flexItem />
      <SectionWorkspaces />
      <SectionCloudEnvironment />
      <SectionUpdates />
      <SectionDivider flexItem />
      <SectionPublications />
      <SectionDivider flexItem />
    </>
  );
};

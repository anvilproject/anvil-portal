import { SectionAnalysisPortals } from "../../components/Home/components/Section/components/SectionAnalysisPortals/sectionAnalysisPortals";
import { SectionCloudEnvironment } from "../../components/Home/components/Section/components/SectionCloudEnvironment/sectionCloudEnvironment";
import { SectionDatasets } from "../../components/Home/components/Section/components/SectionDatasets/sectionDatasets";
import { SectionHero } from "../../components/Home/components/Section/components/SectionHero/sectionHero";
import { SectionWorkspaces } from "../../components/Home/components/Section/components/SectionWorkspaces/sectionWorkspaces";
import { SectionDivider } from "../../components/Home/components/Section/section.styles";

export const HomeView = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionAnalysisPortals />
      <SectionDatasets />
      <SectionDivider flexItem />
      <SectionWorkspaces />
      <SectionCloudEnvironment />
    </>
  );
};

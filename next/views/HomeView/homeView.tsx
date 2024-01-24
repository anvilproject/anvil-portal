import { SectionDivider } from "../../components/Home/components/Section/section.styles";
import { SectionAnalysisPortals } from "../../components/Home/components/SectionAnalysisPortals/sectionAnalysisPortals";
import { SectionDatasets } from "../../components/Home/components/SectionDatasets/sectionDatasets";
import { SectionHero } from "../../components/Home/components/SectionHero/sectionHero";
import { SectionWorkspaces } from "../../components/Home/components/SectionWorkspaces/sectionWorkspaces";

export const HomeView = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionAnalysisPortals />
      <SectionDatasets />
      <SectionDivider flexItem />
      <SectionWorkspaces />
    </>
  );
};

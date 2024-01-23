import { SectionAnalysisPortals } from "../../components/Home/components/SectionAnalysisPortals/sectionAnalysisPortals";
import { SectionDatasets } from "../../components/Home/components/SectionDatasets/sectionDatasets";
import { SectionHero } from "../../components/Home/components/SectionHero/sectionHero";

export const HomeView = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionAnalysisPortals />
      <SectionDatasets />
    </>
  );
};

import { SectionAnalysisPortals } from "../../components/Home/components/SectionAnalysisPortals/sectionAnalysisPortals";
import { SectionHero } from "../../components/Home/components/SectionHero/sectionHero";

export const HomeView = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionAnalysisPortals />
    </>
  );
};

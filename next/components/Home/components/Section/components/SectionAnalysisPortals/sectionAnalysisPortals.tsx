import { AnalysisPortals } from "./components/AnalysisPortals/analysisPortals";
import {
  Section,
  SectionLayout,
  SectionTitle,
} from "./sectionAnalysisPortals.styles";

export const SectionAnalysisPortals = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <SectionTitle>Analysis Portals</SectionTitle>
        <AnalysisPortals />
      </SectionLayout>
    </Section>
  );
};

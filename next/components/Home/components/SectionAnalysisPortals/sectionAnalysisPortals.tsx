import { AnalysisPortals } from "./components/AnalysisPortals/analysisPortals";
import {
  Section,
  SectionContent,
  SectionTitle,
} from "./sectionAnalysisPortals.styles";

export const SectionAnalysisPortals = (): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <SectionTitle>Analysis Portals</SectionTitle>
        <AnalysisPortals />
      </SectionContent>
    </Section>
  );
};

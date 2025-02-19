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
        <SectionTitle>Use your favorite platforms and tools</SectionTitle>
        <AnalysisPortals />
      </SectionLayout>
    </Section>
  );
};

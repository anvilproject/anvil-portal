import { JSX } from "react";
import { Section, SectionSubtitle, SectionTitle } from "../../section.styles";
import { Headline, SectionLayout } from "./sectionExplore.styles";
import { ToolsAndWorkflows } from "./components/ToolsAndWorkflows/toolsAndWorkflows";

export const SectionExplore = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <SectionTitle>Explore</SectionTitle>
          <SectionSubtitle>
            From curated tools and workflows to self-paced tutorials available
            on the Galaxy Training Network (GTN), there are plenty of materials
            to learn from.
          </SectionSubtitle>
        </Headline>
        <ToolsAndWorkflows />
      </SectionLayout>
    </Section>
  );
};

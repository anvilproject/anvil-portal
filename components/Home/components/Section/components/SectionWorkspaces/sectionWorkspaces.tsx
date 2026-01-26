import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { JSX } from "react";
import { Section, SectionSubtitle, SectionTitle } from "../../section.styles";
import { Workspaces } from "./components/Workspaces/workspaces";
import { Headline, SectionLayout } from "./sectionWorkspaces.styles";

const EXPLORE_WORKSPACES =
  "/learn/run-analyses-workflows/using-example-workspaces";

export const SectionWorkspaces = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <SectionTitle>
            Create, share, and reuse reproducible analysis workspaces
          </SectionTitle>
          <SectionSubtitle>
            Workspaces aggregate data and analysis methods. Start quickly from
            an existing workspace and customize it to your needs.
          </SectionSubtitle>
          <ButtonSecondary href={EXPLORE_WORKSPACES}>
            Explore Workspaces
          </ButtonSecondary>
        </Headline>
        <Workspaces />
      </SectionLayout>
    </Section>
  );
};

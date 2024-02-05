import { ButtonSecondary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { Section, SectionSubtitle, SectionTitle } from "../../section.styles";
import { Workspaces } from "./components/Workspaces/workspaces";
import { Headline, SectionLayout } from "./sectionWorkspaces.styles";

const EXPLORE_WORKSPACES = "/learn/analysis-workflows/using-example-workspaces";

interface SectionWorkspacesProps {
  portalURL: string;
}

export const SectionWorkspaces = ({
  portalURL,
}: SectionWorkspacesProps): JSX.Element => {
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
          <ButtonSecondary href={`${portalURL}${EXPLORE_WORKSPACES}`}>
            Explore Workspaces
          </ButtonSecondary>
        </Headline>
        <Workspaces />
      </SectionLayout>
    </Section>
  );
};

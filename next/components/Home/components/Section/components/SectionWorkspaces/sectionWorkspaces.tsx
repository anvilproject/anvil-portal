import { ButtonSecondary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { PORTAL_URL } from "../../../../../../site-config/anvil-portal/dev/config";
import { Workspaces } from "./components/Workspaces/workspaces";
import {
  Headline,
  Section,
  SectionContent,
  SectionTitle,
  Subtitle,
} from "./sectionWorkspaces.styles";

const EXPLORE_WORKSPACES = "/learn/analysis-workflows/using-example-workspaces";

export const SectionWorkspaces = (): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <Headline>
          <SectionTitle>
            Create, share, and reuse reproducible analysis workspaces
          </SectionTitle>
          <Subtitle>
            Workspaces aggregate data and analysis methods. Start quickly from
            an existing workspace and customize it to your needs.
          </Subtitle>
          <ButtonSecondary href={`${PORTAL_URL}${EXPLORE_WORKSPACES}`}>
            Explore Workspaces
          </ButtonSecondary>
        </Headline>
        <Workspaces />
      </SectionContent>
    </Section>
  );
};

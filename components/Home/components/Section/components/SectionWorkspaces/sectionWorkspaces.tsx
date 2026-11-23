import { BUTTON_PRESETS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/presets";
import { Button } from "@mui/material";
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
          <Button
            {...BUTTON_PRESETS.SECONDARY_OUTLINED}
            href={EXPLORE_WORKSPACES}
          >
            Explore Workspaces
          </Button>
        </Headline>
        <Workspaces />
      </SectionLayout>
    </Section>
  );
};

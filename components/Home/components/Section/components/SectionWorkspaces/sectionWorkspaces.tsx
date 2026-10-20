import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";
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
            {...BUTTON_PROPS.SECONDARY_CONTAINED}
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

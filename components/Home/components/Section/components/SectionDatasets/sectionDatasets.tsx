import Link from "next/link";
import { JSX } from "react";
import { Section, SectionLayout } from "../../section.styles";
import { Datasets } from "./components/Datasets/datasets";
import { Metrics } from "./components/Metrics/metrics";
import {
  Headline,
  SectionActions,
  SectionTitle,
} from "./sectionDatasets.styles";
import { Button } from "@mui/material";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";

const CONSORTIA_ROADMAP = "/consortia";
const CONTRIBUTE_DATA = "/learn/submit-data";

export const SectionDatasets = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <SectionTitle>
            Access diverse, open and controlled access, cloud-hosted datasets
          </SectionTitle>
          <Metrics />
        </Headline>
        <Datasets />
        <SectionActions>
          <Button
            color={BUTTON_PROPS.COLOR.SECONDARY}
            component={Link}
            href={CONSORTIA_ROADMAP}
            variant={BUTTON_PROPS.VARIANT.CONTAINED}
          >
            Consortia Roadmap
          </Button>
          <Button
            color={BUTTON_PROPS.COLOR.SECONDARY}
            component={Link}
            href={CONTRIBUTE_DATA}
            variant={BUTTON_PROPS.VARIANT.CONTAINED}
          >
            Contribute Data
          </Button>
        </SectionActions>
      </SectionLayout>
    </Section>
  );
};

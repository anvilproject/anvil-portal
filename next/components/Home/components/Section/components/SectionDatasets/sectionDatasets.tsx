import { ButtonSecondary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { PORTAL_URL } from "../../../../../../site-config/anvil-portal/dev/config";
import { Datasets } from "./components/Datasets/datasets";
import { Metrics } from "./components/Metrics/metrics";
import {
  Headline,
  Section,
  SectionActions,
  SectionContent,
  SectionTitle,
} from "./sectionDatasets.styles";

const CONSORTIA_ROADMAP = "/consortia";
const CONTRIBUTE_DATA =
  "/learn/data-submitters/submission-guide/data-submitters-overview";
const EXPLORE_DATASETS = "/data/consortia";

export const SectionDatasets = (): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <Headline>
          <SectionTitle>
            Access diverse, open and controlled access, cloud-hosted datasets
          </SectionTitle>
          <Metrics />
        </Headline>
        <Datasets />
        <SectionActions>
          <ButtonSecondary href={`${PORTAL_URL}${CONSORTIA_ROADMAP}`}>
            Consortia Roadmap
          </ButtonSecondary>
          <ButtonSecondary href={`${PORTAL_URL}${EXPLORE_DATASETS}`}>
            Explore Datasets
          </ButtonSecondary>
          <ButtonSecondary href={`${PORTAL_URL}${CONTRIBUTE_DATA}`}>
            Contribute Data
          </ButtonSecondary>
        </SectionActions>
      </SectionContent>
    </Section>
  );
};

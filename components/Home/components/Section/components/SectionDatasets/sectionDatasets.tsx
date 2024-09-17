import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import NLink from "next/link";
import { Section, SectionLayout } from "../../section.styles";
import { Datasets } from "./components/Datasets/datasets";
import { Metrics } from "./components/Metrics/metrics";
import {
  Headline,
  SectionActions,
  SectionTitle,
} from "./sectionDatasets.styles";

const CONSORTIA_ROADMAP = "/consortia";
const CONTRIBUTE_DATA =
  "/learn/data-submitters/submission-guide/data-submitters-overview";
const EXPLORE_DATASETS = "/data/consortia";

interface SectionDatasetsProps {
  portalURL: string;
}

export const SectionDatasets = ({
  portalURL,
}: SectionDatasetsProps): JSX.Element => {
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
          <NLink href={CONSORTIA_ROADMAP} legacyBehavior passHref>
            <ButtonSecondary href="passHref">Consortia Roadmap</ButtonSecondary>
          </NLink>
          <ButtonSecondary href={`${portalURL}${EXPLORE_DATASETS}`}>
            Explore Datasets
          </ButtonSecondary>
          <ButtonSecondary href={CONTRIBUTE_DATA}>
            Contribute Data
          </ButtonSecondary>
        </SectionActions>
      </SectionLayout>
    </Section>
  );
};

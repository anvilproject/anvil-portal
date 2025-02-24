import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { REL_ATTRIBUTE } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
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
const CONTRIBUTE_DATA = "/learn/submit-data";
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
          <ButtonSecondary
            href={`${portalURL}${EXPLORE_DATASETS}`}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          >
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

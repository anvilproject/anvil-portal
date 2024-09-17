import { SectionSubtitle, SectionTitle } from "../../section.styles";
import { CloudBenefits } from "./components/CloudBenefits/cloudBenefits";
import {
  Headline,
  Section,
  SectionLayout,
} from "./sectionCloudEnvironment.styles";

export const SectionCloudEnvironment = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <SectionTitle>
            Collaborate in a secure, cost-effective, scalable, cloud-based
            environment
          </SectionTitle>
          <SectionSubtitle>
            Reduce compute and storage costs, reduce security and compliance
            overhead, scale to meet your needs.
          </SectionSubtitle>
        </Headline>
        <CloudBenefits />
      </SectionLayout>
    </Section>
  );
};

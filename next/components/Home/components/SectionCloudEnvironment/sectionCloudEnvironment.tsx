import { CloudBenefits } from "./components/CloudBenefits/cloudBenefits";
import {
  Headline,
  Section,
  SectionContent,
  SectionTitle,
  Subtitle,
} from "./sectionCloudEnvironment.styles";

export const SectionCloudEnvironment = (): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <Headline>
          <SectionTitle>
            Collaborate in a secure, cost-effective, scalable, cloud-based
            environment
          </SectionTitle>
          <Subtitle>
            Reduce compute and storage costs, reduce security and compliance
            overhead, scale to meet your needs.
          </Subtitle>
        </Headline>
        <CloudBenefits />
      </SectionContent>
    </Section>
  );
};

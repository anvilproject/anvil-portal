import { ButtonPrimary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonPrimary/buttonPrimary";
import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { Section } from "../../section.styles";
import { Carousel } from "./components/Carousel/carousel";
import {
  CTAs,
  Head,
  Headline,
  SectionLayout,
  Subhead,
} from "./sectionHero.styles";

const GET_STARTED = "/learn";
const LEARN_MORE = "/overview";

interface SectionHeroProps {
  portalURL: string;
}

export const SectionHero = ({ portalURL }: SectionHeroProps): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <Head>Migrate Your Genomic Research to the Cloud</Head>
          <Subhead>Secure, cost-effective genomic analysis at scale.</Subhead>
          <CTAs>
            <ButtonPrimary href={`${portalURL}${GET_STARTED}`}>
              Get Started
            </ButtonPrimary>
            <ButtonSecondary href={`${portalURL}${LEARN_MORE}`}>
              Learn More
            </ButtonSecondary>
          </CTAs>
        </Headline>
        <Carousel />
      </SectionLayout>
    </Section>
  );
};

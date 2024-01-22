import { ButtonPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonPrimary/buttonPrimary";
import { ButtonSecondary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { PORTAL_URL } from "../../../../site-config/anvil-portal/dev/config";
import { Carousel } from "./components/Carousel/carousel";
import {
  CTAs,
  Head,
  Headline,
  SectionHero as Hero,
  SectionLayout,
  Subhead,
} from "./sectionHero.styles";

const GET_STARTED = "/learn";
const LEARN_MORE = "/overview";

export const SectionHero = (): JSX.Element => {
  return (
    <Hero>
      <SectionLayout>
        <Headline>
          <Head>Migrate Your Genomic Research to the Cloud</Head>
          <Subhead>Secure, cost-effective genomic analysis at scale.</Subhead>
          <CTAs>
            <ButtonPrimary href={`${PORTAL_URL}${GET_STARTED}`}>
              Get Started
            </ButtonPrimary>
            <ButtonSecondary href={`${PORTAL_URL}${LEARN_MORE}`}>
              Learn More
            </ButtonSecondary>
          </CTAs>
        </Headline>
        <Carousel />
      </SectionLayout>
    </Hero>
  );
};

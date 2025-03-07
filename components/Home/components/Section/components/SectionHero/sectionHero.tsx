import { Section } from "../../section.styles";
import { Carousel } from "./components/Carousel/carousel";
import {
  CTAs,
  Head,
  Headline,
  SectionLayout,
  Subhead,
} from "./sectionHero.styles";
import { Button, Link as MLink, Typography } from "@mui/material";
import Link from "next/link";
import {
  COLOR as BUTTON_COLOR,
  VARIANT,
} from "@databiosphere/findable-ui/lib/styles/common/mui/button";
import { COLOR } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { TEXT_BODY_SMALL_400 } from "@databiosphere/findable-ui/lib/theme/common/typography";

const LAUNCH_TERRA = "https://anvil.terra.bio/#workspaces";
const LEARN_MORE = "/learn";

export const SectionHero = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <Head>Migrate Your Genomic Research to the Cloud</Head>
          <Subhead>Secure, cost-effective genomic analysis at scale.</Subhead>
          <CTAs>
            <Button
              color={BUTTON_COLOR.PRIMARY}
              component={Link}
              href={LEARN_MORE}
              rel={REL_ATTRIBUTE.NO_OPENER}
              variant={VARIANT.CONTAINED}
            >
              Learn More
            </Button>
            <Button
              color={BUTTON_COLOR.SECONDARY}
              component={MLink}
              href={LAUNCH_TERRA}
              rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
              sx={{ display: { sm: "block", xs: "none" } }}
              target={ANCHOR_TARGET.BLANK}
              variant={VARIANT.CONTAINED}
            >
              Launch Terra
            </Button>
            <Typography
              color={COLOR.INK_LIGHT}
              component="div"
              sx={{ display: { sm: "block", xs: "none" } }}
              variant={TEXT_BODY_SMALL_400}
            >
              <div>AnVIL&apos;s cloud</div>
              <div>compute environment</div>
            </Typography>
          </CTAs>
        </Headline>
        <Carousel />
      </SectionLayout>
    </Section>
  );
};

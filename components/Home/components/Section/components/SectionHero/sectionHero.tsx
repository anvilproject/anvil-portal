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
import { JSX } from "react";
import Link from "next/link";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";

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
              color={BUTTON_PROPS.COLOR.PRIMARY}
              component={Link}
              href={LEARN_MORE}
              rel={REL_ATTRIBUTE.NO_OPENER}
              size={BUTTON_PROPS.SIZE.LARGE}
              variant={BUTTON_PROPS.VARIANT.CONTAINED}
            >
              Learn More
            </Button>
            <Button
              color={BUTTON_PROPS.COLOR.SECONDARY}
              component={MLink}
              href={LAUNCH_TERRA}
              rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
              size={BUTTON_PROPS.SIZE.LARGE}
              sx={{ display: { sm: "flex", xs: "none" } }}
              target={ANCHOR_TARGET.BLANK}
              variant={BUTTON_PROPS.VARIANT.CONTAINED}
            >
              Launch Terra
            </Button>
            <Typography
              color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
              component="div"
              sx={{ display: { sm: "block", xs: "none" } }}
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
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

import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Button } from "@mui/material";
import { JSX } from "react";
import { ROUTES } from "../../../../../../routes/constants";
import { Section, SectionLayout, SectionTitle } from "../../section.styles";
import { Publications } from "./components/Publications/publications";
import { CTAs, Headline, SectionActions } from "./sectionPublications.styles";

const CITE_ANVIL = "/overview/cite-anvil";
const ADD_PUBLICATION =
  "https://github.com/anvilproject/anvil-portal/issues/new/?template=add-a-publication.md";

export const SectionPublications = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <SectionTitle>Recent Publications</SectionTitle>
          <CTAs>
            <Button {...BUTTON_PROPS.SECONDARY_CONTAINED} href={CITE_ANVIL}>
              Cite AnVIL
            </Button>
            <Button
              color="primary"
              href={ADD_PUBLICATION}
              rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
              target={ANCHOR_TARGET.BLANK}
              variant="contained"
            >
              Add Publication
            </Button>
          </CTAs>
        </Headline>
        <Publications />
        <SectionActions>
          <Button {...BUTTON_PROPS.SECONDARY_CONTAINED} href={ROUTES.CITATIONS}>
            Show all publications
          </Button>
        </SectionActions>
      </SectionLayout>
    </Section>
  );
};

import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Button } from "@mui/material";
import { Section, SectionLayout, SectionTitle } from "../../section.styles";
import { Publications } from "./components/Publications/publications";
import { CTAs, Headline, SectionActions } from "./sectionPublications.styles";

const CITE_ANVIL = "/overview/cite-anvil";
const ADD_PUBLICATION =
  "https://github.com/anvilproject/anvil-portal/issues/new/?template=add-a-publication.md";
const SHOW_ALL_PUBLICATIONS = "/overview/publications";

export const SectionPublications = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <Headline>
          <SectionTitle>Recent Publications</SectionTitle>
          <CTAs>
            <ButtonSecondary href={CITE_ANVIL}>Cite AnVIL</ButtonSecondary>
            <Button
              color="primary"
              href={ADD_PUBLICATION}
              target={ANCHOR_TARGET.BLANK}
              variant="contained"
            >
              Add Publication
            </Button>
          </CTAs>
        </Headline>
        <Publications />
        <SectionActions>
          <ButtonSecondary href={SHOW_ALL_PUBLICATIONS}>
            Show all publications
          </ButtonSecondary>
        </SectionActions>
      </SectionLayout>
    </Section>
  );
};

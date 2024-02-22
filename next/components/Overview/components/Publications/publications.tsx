import {
  Tabs,
  TabValue,
} from "@clevercanary/data-explorer-ui/lib/components/common/Tabs/tabs";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Fragment, useState } from "react";
import { PublicationCard } from "../../../Home/components/Section/components/SectionPublications/common/entities";
import { Card } from "../../../Home/components/Section/components/SectionPublications/components/Publications/components/Card/card";
import { PUBLICATION_TABS } from "./common/constants";
import { PUBLICATION_VIEW } from "./common/entities";
import { Button, PublicationView } from "./publications.styles";

interface PublicationsProps {
  publications: PublicationCard[];
}

export const Publications = ({
  publications,
}: PublicationsProps): JSX.Element => {
  const [publicationView, setPublicationView] = useState<string>(
    PUBLICATION_VIEW.ON_ANVIL
  );
  const categorizedPublications = getCategorizedPublications(
    publications,
    publicationView
  );

  // Callback fired when selected tab value changes.
  const onTabChange = (tabValue: TabValue): void => {
    setPublicationView(tabValue);
  };

  return (
    <Fragment>
      <Button
        color="primary"
        href="https://github.com/anvilproject/anvil-portal/issues/new/?template=add-a-publication.md"
        target={ANCHOR_TARGET.BLANK}
        variant="contained"
      >
        Add Your Publication
      </Button>
      <PublicationView>
        <Tabs
          onTabChange={onTabChange}
          tabs={PUBLICATION_TABS}
          value={publicationView}
        />
        {categorizedPublications.map((publication) => (
          <Card key={publication.title} card={publication} />
        ))}
      </PublicationView>
    </Fragment>
  );
};

/**
 * Returns the publications for the given publication view.
 * @param publications - Publications.
 * @param publicationView - Publication view.
 * @returns publications for the given publication view.
 */
function getCategorizedPublications(
  publications: PublicationCard[],
  publicationView: string
): PublicationCard[] {
  return publications.filter(({ category }) => category === publicationView);
}

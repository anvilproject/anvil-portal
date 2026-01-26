import { JSX } from "react";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { Card } from "./components/Card/card";
import { Grid } from "./publications.styles";

const MAX_PUBLICATION_CARDS = 3;

export const Publications = (): JSX.Element => {
  const { publicationCards } = useSectionsData();
  const cards = publicationCards.slice(0, MAX_PUBLICATION_CARDS);
  return (
    <Grid>
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </Grid>
  );
};

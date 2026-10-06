import { JSX } from "react";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { Card } from "./components/Card/card";
import { Grid } from "./publications.styles";

export const Publications = (): JSX.Element => {
  const { publicationCards } = useSectionsData();
  return (
    <Grid>
      {publicationCards.map((card) => (
        <Card key={card.cardLink} card={card} />
      ))}
    </Grid>
  );
};

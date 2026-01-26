import { JSX } from "react";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { Card } from "./components/Card/card";
import { Grid } from "./workspaces.styles";

export const Workspaces = (): JSX.Element => {
  const { workspaceCards: cards } = useSectionsData();
  return (
    <Grid>
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </Grid>
  );
};

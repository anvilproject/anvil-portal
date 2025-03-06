import { Card } from "./components/Card/card";
import { Grid } from "./toolsAndWorkflows.styles";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";

export const ToolsAndWorkflows = (): JSX.Element => {
  const { toolsAndWorkflowsCards: cards } = useSectionsData();
  return (
    <Grid>
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </Grid>
  );
};

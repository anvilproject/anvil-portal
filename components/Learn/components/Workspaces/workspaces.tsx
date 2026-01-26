import { CARDS as WORKSPACES } from "../../../Home/components/Section/components/SectionWorkspaces/common/content";
import { Card } from "../../../Home/components/Section/components/SectionWorkspaces/components/Workspaces/components/Card/card";
import { Grid } from "@mui/material";
import { JSX } from "react";
import { GRID_PROPS } from "./contants";

export const Workspaces = (): JSX.Element => {
  return (
    <Grid {...GRID_PROPS} sx={{ gap: 4, my: 6 }}>
      {WORKSPACES.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </Grid>
  );
};

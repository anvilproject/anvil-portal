import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { StaticImage } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Grid, Typography } from "@mui/material";
import { JSX } from "react";
import { StyledCard } from "./champions.styles";
import { GRID_PROPS, TYPOGRAPHY_PROPS } from "./constants";
import { ANVIL_CHAMPIONS } from "./content";

export const Champions = (): JSX.Element => {
  return (
    <Grid {...GRID_PROPS}>
      {ANVIL_CHAMPIONS.map(({ media, secondaryText, title }, i) => (
        <Grid size={{ sm: 6, xs: 12 }} key={i}>
          <StyledCard component={RoundedPaper}>
            {media && <StaticImage {...media} />}
            <div>
              <CardTitle>{title}</CardTitle>
              <Typography {...TYPOGRAPHY_PROPS}>{secondaryText}</Typography>
            </div>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

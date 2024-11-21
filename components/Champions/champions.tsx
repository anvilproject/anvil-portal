import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { StaticImage } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Grid2, Typography } from "@mui/material";
import { StyledCard } from "./champions.styles";
import { GRID2_PROPS, TYPOGRAPHY_PROPS } from "./constants";
import { ANVIL_CHAMPIONS } from "./content";

export const Champions = (): JSX.Element => {
  return (
    <Grid2 {...GRID2_PROPS}>
      {ANVIL_CHAMPIONS.map(({ media, secondaryText, title }, i) => (
        <StyledCard key={i} component={RoundedPaper}>
          {media && <StaticImage {...media} />}
          <div>
            <CardTitle>{title}</CardTitle>
            <Typography {...TYPOGRAPHY_PROPS}>{secondaryText}</Typography>
          </div>
        </StyledCard>
      ))}
    </Grid2>
  );
};

import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";

export const Card = styled(MCard)`
  &.MuiCard-root {
    grid-column: auto / span 3;
  }
` as typeof MCard;

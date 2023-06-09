import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";

export const Card = styled(MCard)`
  &.MuiPaper-root {
    margin: 16px 0;
    overflow: visible;
  }
` as typeof MCard;

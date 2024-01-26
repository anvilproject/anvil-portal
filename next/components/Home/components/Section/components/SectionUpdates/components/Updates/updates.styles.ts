import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import {
  CardContent as DefaultContent,
  CardSection as DefaultSection,
  Grid as DefaultGrid,
  GridCard,
} from "../../../../../Card/card.styles";

export const Grid = styled(DefaultGrid)`
  grid-column: 1 / -1;
`;

export const Card = styled(GridCard)`
  align-items: stretch; /* card action area consumes height of card */

  ${mediaTabletUp} {
    grid-column: auto / span 4;
  }
` as typeof MCard;

export const CardSection = styled(DefaultSection)`
  align-content: flex-start;
  height: 100%; /* parent (card action area) is block element */
  padding: 20px;
`;

export const CardContent = styled(DefaultContent)`
  gap: 8px;
`;

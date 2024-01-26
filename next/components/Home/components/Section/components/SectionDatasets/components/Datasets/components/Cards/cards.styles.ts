import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import {
  CardSection as DefaultSection,
  GridCard,
  GridCardContent as DefaultContent,
} from "../../../../../../../Card/card.styles";

export const Card = styled(GridCard)`
  align-items: stretch; /* card action area consumes height of card */
  min-height: 74px;

  ${mediaTabletUp} {
    grid-column: auto / span 6;
  }
` as typeof MCard;

export const CardSection = styled(DefaultSection)`
  gap: 0;
  grid-template-columns: 1fr auto;
  height: 100%; /* parent (card action area) is block element */

  ${mediaDesktopSmallUp} {
    gap: 16px;
  }
`;

export const CardContent = styled(DefaultContent)`
  align-items: center;
`;

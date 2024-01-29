import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import {
  CardContent as DefaultContent,
  CardSection as DefaultSection,
  GridCard,
} from "../../../../../../../Card/card.styles";

export const Card = styled(GridCard)`
  align-items: stretch; /* card action area consumes height of card */

  .MuiCardActionArea-root {
    text-decoration: none;
  }

  .MuiButton-textPrimary {
    justify-self: flex-start;
  }
` as typeof MCard;

export const CardSection = styled(DefaultSection)`
  align-content: flex-start;
  gap: 8px;
  height: 100%; /* parent (card action area) is block element */
  padding: 20px;
`;

export const CardContent = styled(DefaultContent)`
  gap: 8px;
`;

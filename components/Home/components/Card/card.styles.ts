import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import { sectionGrid } from "../Section/section.styles";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

export const Grid = styled.div`
  ${sectionGrid};
`;

export const GridCard = styled(MCard)`
  align-items: flex-start;
  display: grid;
  grid-column: 1 / -1;

  .MuiCardActionArea-root {
    text-decoration: none;
  }
` as typeof MCard;

export const CardSection = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px;
`;

export const GridCardContent = styled.div`
  display: grid;
`;

export const CardContent = styled(GridCardContent)`
  gap: 4px;
`;

export const CardTitle = styled.span`
  font: ${FONT.BODY_500};
`;

export const CardCTA = styled.div`
  align-self: center;
  display: flex;
  padding: 10px;
`;

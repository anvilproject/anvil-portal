import { textBody500 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import { sectionGrid } from "../Section/section.styles";

export const Grid = styled.div`
  ${sectionGrid};
`;

export const GridCard = styled(MCard)`
  align-items: flex-start;
  display: grid;
  grid-column: 1 / -1;
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
  ${textBody500};
`;

export const CardCTA = styled.div`
  align-self: center;
  display: flex;
  padding: 10px;
`;

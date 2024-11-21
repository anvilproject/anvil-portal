import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  align-items: center;
  display: grid;
  flex: 1;
  gap: 16px;
  grid-template-columns: auto 1fr;
  padding: 8px;

  img {
    margin: 0;
  }
` as typeof Card;

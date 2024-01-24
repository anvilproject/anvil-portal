import { textBody500 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";

export const Card = styled(MCard)`
  &.MuiCard-root {
    align-self: stretch;
    grid-column: auto / span 3;
  }
` as typeof MCard;

export const CardSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CardTitle = styled.span`
  ${textBody500};
}
`;

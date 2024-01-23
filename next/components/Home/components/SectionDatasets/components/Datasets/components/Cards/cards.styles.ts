import { mediaDesktopSmallUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { textBodyLarge500 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";

export const Card = styled(MCard)`
  display: flex;
  min-height: 74px;
` as typeof MCard;

export const CardSection = styled.div`
  display: flex;
  gap: 0;
  height: 100%;
  padding: 16px;

  ${mediaDesktopSmallUp} {
    gap: 16px;
  }
`;

export const CardContent = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const CardTitle = styled.span`
  ${textBodyLarge500};
}
`;

export const CardActions = styled.div`
  align-self: center;
  display: flex;
  padding: 10px;
`;

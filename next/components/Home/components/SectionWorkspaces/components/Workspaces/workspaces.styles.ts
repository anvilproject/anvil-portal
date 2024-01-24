import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { textBody500 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";

export const Workspaces = styled("div")`
  display: grid;
  gap: 16px;
  grid-column: 1 / -1;
  grid-template-columns: repeat(6, 1fr);

  ${mediaTabletUp} {
    grid-column: 7 / -1;
  }
`;

export const Card = styled(MCard)`
  display: flex;
  grid-column: 1 / -1;

  ${mediaTabletUp} {
    grid-column: auto / span 6;
  }
` as typeof MCard;

export const CardSection = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px;

  ${mediaDesktopSmallUp} {
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardContent = styled.span`
  display: grid;
  gap: 4px;
`;

export const CardTitle = styled.span`
  ${textBody500};
}
`;

export const CardActions = styled.div`
  align-self: center;
  display: flex;
  padding: 10px;
`;

import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { inkLight } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import {
  textBody400,
  textBodyLarge500,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import { CardMedia } from "../../../../../Card/components/CardMedia/cardMedia";

export const CloudBenefits = styled("div")`
  display: grid;
  gap: 16px;
  grid-column: 1 / -1;
  justify-items: center;

  ${mediaTabletUp} {
    display: contents;
  }
`;

export const Card = styled(MCard)`
  background-color: transparent;
  display: flex;
  grid-column: 1 / -1;

  ${mediaTabletUp} {
    &:first-of-type {
      grid-column: 1 / span 3;
    }

    grid-column: auto / span 3;
  }
` as typeof MCard;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Media = styled(CardMedia)`
  align-self: center;

  ${mediaTabletUp} {
    align-self: flex-start;
  }
`;

export const CardContent = styled.span`
  display: grid;
  gap: 8px;
  text-align: center;

  ${mediaTabletUp} {
    margin-right: 24px;
    text-align: left;
  }
`;

export const CardTitle = styled.span`
  ${textBodyLarge500};
}
`;

export const CardSecondaryText = styled.span`
  ${textBody400};
  color: ${inkLight};
`;

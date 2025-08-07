import {
  mediaTabletUp,
  mediaTabletDown,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import {
  textBody500,
  textBodyLarge500,
  textBodySmall4002Lines,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import {
  MAX_CARD_HEIGHT,
  MAX_CARD_HEIGHT_SM,
  MAX_CARD_WIDTH,
  MIN_CONTENT_CARD_HEIGHT,
} from "../../common/constants";
import {
  getCardTransform,
  getCardTransition,
  getCardZIndex,
} from "../../common/utils";
import { SHADOWS } from "@databiosphere/findable-ui/lib/styles/common/constants/shadows";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { CardMedia } from "../../../../../../../Card/components/CardMedia/cardMedia";

interface Props {
  cardPosition: number;
}

export const CardPositioner = styled("div")<Props>`
  display: grid;
  height: 100%;
  max-height: ${MAX_CARD_HEIGHT_SM}px;
  max-width: ${MAX_CARD_WIDTH}px;
  position: absolute;
  transform: ${({ cardPosition }) => getCardTransform(cardPosition)};
  transition: ${({ cardPosition }) => getCardTransition(cardPosition)};
  width: 100%;
  z-index: ${({ cardPosition }) => getCardZIndex(cardPosition)};

  ${mediaTabletUp} {
    max-height: ${MAX_CARD_HEIGHT}px;
  }
`;

export const Card = styled(MCard)`
  border: none;
  box-shadow:
    ${SHADOWS["01"]},
    inset 0 0 0 1px ${PALETTE.SMOKE_MAIN};
  box-sizing: border-box;
  display: flex;
  gap: 0 8px;
  height: 100%;
  padding: 8px;
  width: 100%;
` as typeof MCard;

export const StyledCardMedia = styled(CardMedia)`
  ${mediaTabletDown} {
    display: none;
  }
`;

export const CardSection = styled.div`
  align-self: center;
  flex: 1;
  min-height: ${MIN_CONTENT_CARD_HEIGHT}px;
  padding: 16px;
`;

export const CardTitle = styled.span`
  ${textBodyLarge500};
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;

  ${mediaTabletUp} {
    -webkit-line-clamp: 2;
  }
}
`;

export const CardText = styled.span`
  ${textBodySmall4002Lines};
  -webkit-box-orient: vertical;
  color: ${PALETTE.INK_LIGHT};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  margin: 8px 0 16px;
  overflow: hidden;

  ${mediaTabletUp} {
    -webkit-line-clamp: 3;
  }
`;

export const CardActions = styled.div`
  align-items: flex-end;
  display: flex;
  flex: 1;
  gap: 16px;

  .MuiLink-root {
    ${textBody500};
  }
`;

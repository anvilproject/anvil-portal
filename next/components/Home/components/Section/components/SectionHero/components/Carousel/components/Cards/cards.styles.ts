import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import {
  inkLight,
  smokeMain,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import {
  textBody500,
  textBodyLarge500,
  textBodySmall4002Lines,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import { elevation01 } from "@clevercanary/data-explorer-ui/lib/theme/common/shadows";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import {
  CAROUSEL_HEIGHT,
  CAROUSEL_HEIGHT_SM,
  MAX_CARD_HEIGHT,
  MAX_CARD_HEIGHT_SM,
  MAX_CARD_WIDTH,
} from "../../common/constants";
import {
  getCardTransform,
  getCardTransition,
  getCardZIndex,
} from "../../common/utils";

interface Props {
  activeCard: number;
  cardIndex: number;
  cardPosition: number;
}

export const Cards = styled.div`
  cursor: grab;
  height: ${CAROUSEL_HEIGHT_SM}px;
  position: relative; /* Positions CardPositioner. */
  user-select: none;

  ${mediaTabletUp} {
    height: ${CAROUSEL_HEIGHT}px;
  }

  .MuiIconButton-root {
    opacity: 0;
    transition: opacity 150ms ease-in-out;
  }

  &:hover {
    > .MuiIconButton-root {
      opacity: 1;
    }
  }
`;

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
  box-shadow: ${elevation01}, inset 0 0 0 1px ${smokeMain};
  display: flex;
  height: 100%;
  width: 100%;
` as typeof MCard;

export const CardSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
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
  color: ${inkLight};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  margin: 8px 0 16px;
  overflow: hidden;

  ${mediaTabletUp} {
    -webkit-line-clamp: 2;
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

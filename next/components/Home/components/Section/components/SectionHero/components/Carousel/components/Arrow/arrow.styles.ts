import { mediaTabletDown } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import {
  inkMain,
  smokeDark,
  smokeLightest,
  white,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import { black08 } from "@clevercanary/data-explorer-ui/lib/theme/common/palette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton as MIconButton } from "@mui/material";
import { MAX_DECK_SIZE } from "../../common/constants";
import { CarouselAction, CAROUSEL_ACTION } from "../../common/entities";
import { getArrowTransform } from "../../common/utils";

interface Props {
  carouselAction: CarouselAction;
}

export const IconButton = styled(MIconButton, {
  shouldForwardProp: (props) => props !== "carouselAction",
})<Props>`
  & {
    background-color: ${white};
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px ${smokeDark}, 0 1px 0 0 ${black08};
    color: ${inkMain};
    position: absolute;
    top: 50%;
    transform: ${({ carouselAction }) => getArrowTransform(carouselAction)};
    z-index: ${MAX_DECK_SIZE + 1};

    &:hover {
      background-color: ${smokeLightest};
    }

    &:active {
      box-shadow: inset 0 0 0 1px ${smokeDark};
    }

    ${mediaTabletDown} {
      display: none;
    }
  }

  ${({ carouselAction }) =>
    carouselAction === CAROUSEL_ACTION.SWIPE_BACKWARD &&
    css`
      left: 0;
    `}

  ${({ carouselAction }) =>
    carouselAction === CAROUSEL_ACTION.SWIPE_FORWARD &&
    css`
      right: 0;
    `}
`;

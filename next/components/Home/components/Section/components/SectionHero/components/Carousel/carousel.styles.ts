import { mediaDesktopSmallUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Bullets as SectionBullets } from "../../../../../Bullets/bullets";
import { MAX_CARD_WIDTH } from "./common/constants";

export const CarouselView = styled.div`
  grid-column: 1 / -1;
  justify-self: center;
  max-width: ${MAX_CARD_WIDTH}px;
  width: 100%;

  ${mediaDesktopSmallUp} {
    grid-column: 7 / -1;
  }
`;

export const Bullets = styled(SectionBullets)`
  margin-top: 12px;
`;

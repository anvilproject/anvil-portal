import styled from "@emotion/styled";
import { Bullets as SectionBullets } from "../../../Bullets/bullets";
import { MAX_CARD_WIDTH } from "./common/constants";

export const CarouselView = styled.div`
  max-width: ${MAX_CARD_WIDTH}px;
  width: 100%;
`;

export const Bullets = styled(SectionBullets)`
  margin-top: 12px;
`;

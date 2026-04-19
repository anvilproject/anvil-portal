import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import {
  CardContent as DefaultContent,
  Grid as DefaultGrid,
  CardSection as DefaultSection,
  GridCard,
} from "../../../../../Card/card.styles";

export const Grid = styled(DefaultGrid)`
  grid-column: 1 / -1;
`;

export const Card = styled(GridCard)`
  background-color: transparent;

  ${bpUpSm} {
    grid-column: auto / span 3;
  }
`;

export const CardSection = styled(DefaultSection)`
  justify-items: center;
  padding: 0;

  ${bpUpSm} {
    justify-items: flex-start;
  }
`;

export const CardContent = styled(DefaultContent)`
  gap: 8px;
  text-align: center;

  ${bpUpSm} {
    margin-right: 24px;
    text-align: left;
  }
`;

export const CardSecondaryTitle = styled.span`
  color: ${PALETTE.INK_LIGHT};
  font: ${FONT.BODY_400};
`;

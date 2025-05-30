import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import {
  CardContent as DefaultContent,
  CardSection as DefaultSection,
  Grid as DefaultGrid,
  GridCard,
} from "../../../../../Card/card.styles";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const Grid = styled(DefaultGrid)`
  grid-column: 1 / -1;
`;

export const Card = styled(GridCard)`
  background-color: transparent;

  ${mediaTabletUp} {
    grid-column: auto / span 3;
  }
`;

export const CardSection = styled(DefaultSection)`
  justify-items: center;
  padding: 0;

  ${mediaTabletUp} {
    justify-items: flex-start;
  }
`;

export const CardContent = styled(DefaultContent)`
  gap: 8px;
  text-align: center;

  ${mediaTabletUp} {
    margin-right: 24px;
    text-align: left;
  }
`;

export const CardSecondaryTitle = styled.span`
  ${textBody400};
  color: ${PALETTE.INK_LIGHT};
`;

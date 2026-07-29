import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)`
  color: ${PALETTE.INK_LIGHT};
  font: ${FONT.BODY_SMALL_400_2_LINES};
`;

export const StyledDot = styled.span`
  background-color: ${PALETTE.INK_LIGHT};
  border-radius: 50%;
  display: inline-block;
  height: 4px;
  margin: 0 8px;
  vertical-align: 0.21em; /* cap-height midpoint */
  width: 4px;
`;

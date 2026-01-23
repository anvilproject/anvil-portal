import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";
import { CardContent } from "@mui/material";

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  code {
    background-color: ${PALETTE.SMOKE_MAIN};
    border-radius: 4px;
    display: inline-block;
    font: ${FONT.BODY_SMALL_400};
    margin: 2px 0;
    overflow-wrap: anywhere;
    padding: 4px 8px;
  }
`;

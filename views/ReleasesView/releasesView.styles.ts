import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  border: 1px solid ${PALETTE.SMOKE_MAIN};
  border-radius: 8px;
  overflow: hidden;

  .MuiCardActionArea-root {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr auto;
    padding: 16px;
  }

  .MuiSvgIcon-root {
    box-sizing: content-box;
    padding: 10px;
  }
` as typeof Card;

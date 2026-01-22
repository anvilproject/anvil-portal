import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  & {
    .MuiCardHeader-root,
    .MuiCardContent-root {
      margin: 16px 0;
      padding-bottom: 0;
      padding-top: 0;
    }
  }

  .MuiCardHeader-root {
    font: ${FONT.BODY_LARGE_500};

    .MuiCardHeader-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }

  .MuiCardContent-root {
    font: ${FONT.BODY_400_2_LINES};

    p {
      font: inherit;
    }
  }

  .MuiCardActions-root {
    gap: 16px;
    font: ${FONT.BODY_400};
    flex-wrap: wrap;
    padding: 16px;
  }
` as typeof Card;

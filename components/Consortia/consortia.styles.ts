import { Grid } from "@databiosphere/findable-ui/lib/components/common/Grid/grid";
import styled from "@emotion/styled";

export const Consortia = styled(Grid)`
  .MuiCard-root {
    .MuiTypography-text-body-400-2lines {
      p {
        font: inherit;
        margin-bottom: 8px;

        &:last-of-type {
          margin: 0;
        }
      }
    }
  }
`;

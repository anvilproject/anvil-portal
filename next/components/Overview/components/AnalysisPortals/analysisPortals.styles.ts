import { Grid as DXGrid } from "@databiosphere/findable-ui/lib/components/common/Grid/grid";
import { textBody500 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const Grid = styled(DXGrid)`
  .MuiPaper-root {
    .MuiCardActionArea-root {
      > div {
        justify-content: flex-start;
        padding: 16px;

        div:nth-of-type(1) {
          gap: 4px;
          grid-column: 2;

          h4 {
            ${textBody500};
          }
        }

        div:nth-of-type(2) {
          grid-column: 1;
          grid-row: 1;
        }
      }
    }
  }
`;

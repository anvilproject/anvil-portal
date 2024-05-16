import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { textBody500 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Grid as DefaultGrid } from "../../../../../Card/card.styles";

export const Grid = styled(DefaultGrid)`
  grid-column: 1 / -1;
  grid-template-columns: repeat(6, 1fr);

  ${mediaTabletUp} {
    grid-column: 7 / -1;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardTitle = styled.span`
  ${textBody500};
}
`;

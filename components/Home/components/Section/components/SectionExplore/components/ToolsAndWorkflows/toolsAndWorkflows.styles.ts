import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Grid as DefaultGrid } from "../../../../../Card/card.styles";

export const Grid = styled(DefaultGrid)`
  grid-column: 1 / -1;
  grid-template-columns: repeat(6, 1fr);

  ${bpUpSm} {
    grid-column: 7 / -1;
  }
`;

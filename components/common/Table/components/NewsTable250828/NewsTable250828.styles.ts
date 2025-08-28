import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const StyledContainer = styled(Container)`
  .MuiTable-root {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    tbody,
    thead,
    tr {
      display: grid;
      gap: inherit;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
    }

    th {
      align-items: center;
      display: flex;
    }
  }
`;

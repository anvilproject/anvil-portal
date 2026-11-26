import styled from "@emotion/styled";

/**
 * Row of page header buttons that wraps on narrow screens.
 */
export const PageActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 16px 0 32px;

  /* Overrides the content's vertical margin on primary contained buttons, so every button sits in the row. */
  && .MuiButton-root {
    margin: 0;
  }
`;

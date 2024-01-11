import { mediaDesktopSmallDown } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Button as MButton } from "@mui/material";

export const Button = styled(MButton)`
  padding: 8px 16px;

  ${mediaDesktopSmallDown} {
    display: none;
  }
`;

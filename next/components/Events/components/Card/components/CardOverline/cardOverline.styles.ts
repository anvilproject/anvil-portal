import styled from "@emotion/styled";
import { Typography as MTypography } from "@mui/material";

export const CardOverline = styled(MTypography)`
  align-items: center;
  display: flex;
  gap: 4px;

  .MuiTypography-root {
    &:last-of-type {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

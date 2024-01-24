import styled from "@emotion/styled";
import { Divider as MDivider } from "@mui/material";

export const SectionLayout = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1232px;
`;

export const SectionDivider = styled(MDivider)`
  border-bottom-width: 3px;
  border-color: transparent;
  border-image: linear-gradient(
      to right,
      #f9b9a5 0 25%,
      #e8e678 25% 50%,
      #cdeef2 50% 75%,
      #97b9ce 75% 100%
    )
    1; // border-image-slice is 1 by default for linear-gradients.
`;

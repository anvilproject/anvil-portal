import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main.styles";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";

interface Props {
  offset: number;
}

export const MainWithOffset = styled(DXMain, {
  shouldForwardProp: (props) => props !== "offset",
})<Props>`
  background-color: ${PALETTE.COMMON_WHITE};
  flex-direction: column;
  padding-top: ${({ offset }) => offset}px;
`;

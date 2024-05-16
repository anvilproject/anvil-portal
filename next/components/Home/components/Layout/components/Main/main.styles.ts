import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main.styles";
import { white } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";

interface Props {
  offset: number;
}

export const MainWithOffset = styled(DXMain, {
  shouldForwardProp: (props) => props !== "offset",
})<Props>`
  background-color: ${white};
  flex-direction: column;
  padding-top: ${({ offset }) => offset}px;
`;

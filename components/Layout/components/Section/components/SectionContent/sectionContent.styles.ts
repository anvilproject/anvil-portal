import {
  Content,
  ContentGrid,
  OutlineGrid,
  Positioner,
} from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/contentLayout.styles";
import { bpDownSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const StyledSection = styled.section`
  flex: 1;
  width: 100%;
`;

export const StyledContentGrid = styled(ContentGrid)`
  padding: 64px 0;
`;

export const StyledContent = styled(Content)`
  padding: 0 40px;

  ${bpDownSm} {
    padding: 0 16px;
  }
`;

export const StyledOutlineGrid = styled(OutlineGrid)`
  padding: 64px 0;
`;

export const StyledPositioner = styled(Positioner)`
  max-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
  padding-top: 0;
  top: ${({ headerHeight }) => `${headerHeight}px`};
`;

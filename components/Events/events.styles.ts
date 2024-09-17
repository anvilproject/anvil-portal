import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const EventsView = styled.div`
  display: grid;
  gap: 16px;
  margin: 24px -16px 0;

  ${mediaTabletUp} {
    margin: 16px 0 0 0;
  }
`;

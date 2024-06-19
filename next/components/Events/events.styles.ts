import { CardSection as DXCardSection } from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import {
  mediaTabletDown,
  mediaTabletUp,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const EventsView = styled.div`
  display: grid;
  gap: 16px;
  margin: 16px -16px 0;

  ${mediaTabletUp} {
    margin: 16px 0 0 0;
  }
`;

export const CardSection = styled(DXCardSection)`
  ${mediaTabletDown} {
    padding: 16px;
  }
`;

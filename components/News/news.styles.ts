import { CardSection as DXCardSection } from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import {
  bpDownSm,
  bpUpSm,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const NewsView = styled.div`
  display: grid;
  gap: 16px;
  margin: 16px -16px 0;

  ${bpUpSm} {
    margin: 16px 0 0 0;
  }
`;

export const CardSection = styled(DXCardSection)`
  ${bpDownSm} {
    padding: 16px;
  }
`;

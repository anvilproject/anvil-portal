import {
  CardContent as DXCardContent,
  CardSection as DXCardSection,
} from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import { bpDownSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const CardSection = styled(DXCardSection)`
  gap: 20px;
  grid-template-columns: 64px 1fr;

  ${bpDownSm} {
    grid-template-columns: 56px 1fr;
    padding: 16px;
  }
`;

export const CardContent = styled(DXCardContent)`
  gap: 4px;
  min-width: 0;
`;

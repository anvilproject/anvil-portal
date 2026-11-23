import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import {
  SectionActions as DefaultActions,
  SectionHeadline as DefaultHeadline,
} from "../../section.styles";

export const Headline = styled(DefaultHeadline)`
  ${bpUpSm} {
    grid-template-columns: 1fr auto;
  }
`;

export const CTAs = styled(DefaultActions)`
  flex-direction: row;
  gap: 8px;

  .MuiButton-colorSecondary {
    order: 1;
  }

  ${bpUpSm} {
    .MuiButton-colorSecondary {
      order: 0;
    }
  }
`;

export const SectionActions = styled(DefaultActions)`
  align-items: center;
  justify-content: center;
`;

import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { bpUp1024 } from "../../../../../../styles/common/mixins/breakpoints";
import {
  SectionHeadline as DefaultHeadline,
  SectionTitle as DefaultTitle,
  sectionGrid,
} from "../../section.styles";

export const Headline = styled(DefaultHeadline)`
  gap: 24px;

  ${bpUp1024} {
    ${sectionGrid};
  }
`;

export const SectionTitle = styled(DefaultTitle)`
  max-width: 504px;

  ${bpUp1024} {
    grid-column: 1 / 6;
    max-width: unset;
  }
`;

export const SectionActions = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  ${bpUpSm} {
    grid-template-columns: repeat(12, 1fr);

    .MuiButton-root {
      &:first-of-type {
        grid-column: 1 / 7;
        justify-self: flex-end;
      }

      &:last-of-type {
        grid-column: 7 / 12;
        justify-self: flex-start;
      }
    }
  }
`;

import styled from "@emotion/styled";
import {
  Section as DefaultSection,
  SectionLayout as DefaultLayout,
  SectionTitle as DefaultSectionTitle,
} from "../../section.styles";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const Section = styled(DefaultSection)`
  background-color: ${PALETTE.SMOKE_LIGHTEST};
  overflow: hidden;
`;

export const SectionLayout = styled(DefaultLayout)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 64px 16px;
`;

export const SectionTitle = styled(DefaultSectionTitle)`
  ${bpUpSm} {
    text-align: center;
  }
`;

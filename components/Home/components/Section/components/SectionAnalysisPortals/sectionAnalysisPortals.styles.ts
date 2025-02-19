import { smokeLightest } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";
import {
  SectionLayout as DefaultLayout,
  Section as DefaultSection,
  SectionTitle as DefaultSectionTitle,
} from "../../section.styles";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";

export const Section = styled(DefaultSection)`
  background-color: ${smokeLightest};
  overflow: hidden;
`;

export const SectionLayout = styled(DefaultLayout)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 64px 16px;
`;

export const SectionTitle = styled(DefaultSectionTitle)`
  ${mediaTabletUp} {
    text-align: center;
  }
`;

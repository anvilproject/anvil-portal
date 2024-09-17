import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { smokeLightest } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";
import {
  Section as DefaultSection,
  SectionLayout as DefaultLayout,
} from "../../section.styles";

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

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.4px;
  line-height: 34px;
  margin: 0;
  text-align: center;

  ${mediaTabletUp} {
    display: none;
  }
`;

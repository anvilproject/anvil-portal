import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { smokeLightest } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import { textHeading } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { SectionLayout } from "../../section.styles";

export const Section = styled.section`
  background-color: ${smokeLightest};
  overflow: hidden;
  width: 100%;
`;

export const SectionContent = styled(SectionLayout)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 64px 16px;
`;

export const SectionTitle = styled.h2`
  ${textHeading};
  font-size: 24px;
  letter-spacing: -0.4px;
  line-height: 34px;
  margin: 0;
  text-align: center;
  width: 100%;

  ${mediaTabletUp} {
    display: none;
  }
`;

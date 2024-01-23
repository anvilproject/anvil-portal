import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { textHeadingLarge } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { SectionLayout } from "../Section/section.styles";

export const Section = styled.section`
  width: 100%;
`;

export const SectionContent = styled(SectionLayout)`
  padding: 56px 16px;

  ${mediaTabletUp} {
    padding: 64px 16px;
  }
`;

export const Headline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${mediaDesktopSmallUp} {
    align-items: flex-start;
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
  }
`;

export const SectionTitle = styled.div`
  ${textHeadingLarge};
  font-size: 30px;
  letter-spacing: -0.8px;
  line-height: 40px;
  max-width: 504px;
`;

export const SectionActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;

  ${mediaTabletUp} {
    flex-direction: row;
  }
`;

import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { textHeadingLarge } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { mediaTabletLargeUp } from "../../../../../../styles/common/mixins/breakpoints";
import { SectionLayout } from "../../section.styles";

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

  ${mediaTabletLargeUp} {
    display: grid;
    gap: 0 16px;
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const SectionTitle = styled.h2`
  ${textHeadingLarge};
  font-size: 30px;
  letter-spacing: -0.8px;
  line-height: 40px;
  margin: 0;
  max-width: 504px;

  ${mediaTabletLargeUp} {
    grid-column: 1 / 6;
    max-width: unset;
  }
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

import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { inkLight } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import {
  textBodyLarge4002Lines,
  textHeadingLarge,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { SectionLayout } from "../../section.styles";

export const Section = styled.section`
  width: 100%;
`;

export const SectionContent = styled(SectionLayout)`
  display: grid;
  gap: 48px 16px;
  grid-template-columns: repeat(12, 1fr);
  padding: 56px 16px;

  ${mediaTabletUp} {
    padding: 64px 16px;
  }
`;

export const Headline = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 16px;
  grid-column: 1 / -1;
  max-width: 504px;

  ${mediaTabletUp} {
    grid-column: 1 / 6;
    max-width: unset;
  }
`;

export const SectionTitle = styled.h2`
  ${textHeadingLarge};
  font-size: 30px;
  letter-spacing: -0.8px;
  line-height: 40px;
  margin: 0;
`;

export const Subtitle = styled.h3`
  ${textBodyLarge4002Lines};
  color: ${inkLight};
  margin: 0;
`;

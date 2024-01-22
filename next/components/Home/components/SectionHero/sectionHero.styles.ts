import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { inkLight } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import { textBodyLarge4002Lines } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { SectionLayout as HeroLayout } from "../Section/section.styles";

export const SectionHero = styled.section`
  width: 100%;
`;

export const SectionLayout = styled(HeroLayout)`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding: 56px 16px;

  ${mediaTabletUp} {
    padding: 80px 16px;
  }

  ${mediaDesktopSmallUp} {
    align-items: flex-start;
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
  }
`;

export const Headline = styled.div`
  max-width: 504px;
  text-align: center;
  width: 100%;

  ${mediaDesktopSmallUp} {
    text-align: left;
  }
`;

export const Head = styled.h1`
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -1.4px;
  line-height: 48px;
  margin: 0;

  ${mediaTabletUp} {
    font-size: 48px;
    line-height: 56px;
  }
`;

export const Subhead = styled.h2`
  ${textBodyLarge4002Lines};
  color: ${inkLight};
  margin: 8px 0 16px;
  text-align: center;

  ${mediaDesktopSmallUp} {
    text-align: left;
  }
`;

export const CTAs = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  ${mediaDesktopSmallUp} {
    justify-content: flex-start;
  }
`;

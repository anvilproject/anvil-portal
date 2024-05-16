import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { inkLight } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import { textBodyLarge4002Lines } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import {
  SectionActions as DefaultActions,
  sectionGrid,
  SectionHeadline as DefaultHeadline,
  SectionLayout as DefaultLayout,
} from "../../section.styles";

export const SectionLayout = styled(DefaultLayout)`
  ${sectionGrid};
  gap: 56px 16px;

  ${mediaTabletUp} {
    padding: 80px 16px;
  }
`;

export const Headline = styled(DefaultHeadline)`
  grid-column: 1 / -1;
  justify-items: center;
  justify-self: center;
  max-width: 504px;
  text-align: center;

  ${mediaDesktopSmallUp} {
    grid-column: 1 / 6;
    justify-items: flex-start;
    max-width: unset;
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
  margin: -8px 0 0;
`;

export const CTAs = styled(DefaultActions)`
  flex-direction: row;
`;

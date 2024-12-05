import {
  Content,
  ContentLayout,
} from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/contentLayout.styles";
import {
  media1366Up,
  mediaDesktopSmallUp,
  mediaTabletDown,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { smokeLightest } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import { textHeadingXLarge } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  headerHeight: number;
}

export const StyledSection = styled("section", {
  shouldForwardProp: (props) => props !== "headerHeight",
})<Props>`
  background-color: ${smokeLightest};
  padding-top: ${({ headerHeight }) => headerHeight}px;
  width: 100%;
`;

export const SectionLayout = styled(ContentLayout)`
  grid-template-areas: "hero";

  ${mediaDesktopSmallUp} {
    ${({ hasNavigation }) =>
      hasNavigation
        ? css`
            grid-template-areas: ". hero";
          `
        : css`
            grid-template-areas: "hero";
          `};
  }

  ${media1366Up} {
    grid-template-areas: ". hero .";
  }

  .MuiDivider-root {
    grid-column: 1 / -1;
  }
`;

export const Headline = styled(Content)`
  grid-area: hero;
  padding-bottom: 40px;
  padding-top: 40px;
  width: 100%;

  ${mediaTabletDown} {
    padding-bottom: 40px;
    padding-top: 40px;
  }

  .MuiBreadcrumbs-root {
    margin: 0;
  }
`;

export const PageTitle = styled.h1`
  ${textHeadingXLarge};
  margin: 0;
`;

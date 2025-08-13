import {
  Content,
  ContentLayout,
} from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/contentLayout.styles";
import {
  bpUp1366,
  bpUpMd,
  bpDownSm,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { typographyToCSS } from "@databiosphere/findable-ui/lib/styles/common/mixins/typography";

interface Props {
  headerHeight: number;
}

export const StyledSection = styled("section", {
  shouldForwardProp: (props) => props !== "headerHeight",
})<Props>`
  background-color: ${PALETTE.SMOKE_LIGHTEST};
  padding-top: ${({ headerHeight }) => headerHeight}px;
  width: 100%;
`;

export const SectionLayout = styled(ContentLayout)`
  grid-template-areas: "hero";

  ${bpUpMd} {
    ${({ hasNavigation }) =>
      hasNavigation
        ? css`
            grid-template-areas: ". hero";
          `
        : css`
            grid-template-areas: "hero";
          `};
  }

  ${bpUp1366} {
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

  ${bpDownSm} {
    padding-bottom: 40px;
    padding-top: 40px;
    width: calc(100% - 32px);
  }

  .MuiBreadcrumbs-root {
    margin: 0 0 4px;
  }
`;

export const PageTitle = styled.h1`
  ${typographyToCSS("heading-xlarge")};
  margin: 0 auto;
`;

export const PageSubTitle = styled.div`
  color: ${PALETTE.INK_LIGHT};
  font: ${FONT.BODY_400_2_LINES};
  margin: 0 auto;
`;

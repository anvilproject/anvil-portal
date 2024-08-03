import { textHeadingSmall } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

interface Props {
  headerHeight: number;
}

export const Content = styled.div<Props>`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:hover {
      a {
        opacity: 1;
      }
    }
  }

  h1 {
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 24}px;
  }

  h2,
  h3 {
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 32}px;
  }

  ol + p,
  ul + p {
    margin-top: 16px;
  }

  .MuiAlert-root {
    margin: 24px 0;

    &.MuiAlert-standardWarning {
      margin: 16px 0;
    }

    .MuiAlert-message {
      gap: 16px;

      .MuiAlertTitle-root {
        ${textHeadingSmall};
      }
    }
  }

  .MuiButton-containedPrimary {
    display: flex;
    margin: 16px 0;
    width: fit-content;
  }
`;

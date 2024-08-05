import {
  textBodyLarge4002Lines,
  textHeadingSmall,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { smokeMain } from "../../../../../../findable-ui/lib/styles/common/mixins/colors";

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

  h4 {
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 24}px;
  }

  sup a {
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 48}px;
  }

  h1 + ol,
  h1 + p,
  h1 + ul {
    margin-top: 16px;
  }

  ol + p,
  pre + p,
  ul + p {
    margin-top: 16px;
  }

  ol ol {
    list-style-type: lower-roman;
  }

  section[data-footnotes] {
    border-top: 1px solid ${smokeMain};
    margin-top: 24px;
    padding-top: 16px;

    h2[id="footnotes"] {
      display: none;
    }
  }

  .MuiAlert-root {
    margin: 24px 0;

    &.MuiAlert-standardWarning {
      margin: 16px 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .MuiAlert-message {
      ${textBodyLarge4002Lines};

      ol > li,
      ul > li {
        margin: 8px 0;

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .MuiAlert-message:first-of-type {
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

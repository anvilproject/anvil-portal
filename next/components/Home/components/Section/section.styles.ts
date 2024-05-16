import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { inkLight } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import {
  textBodyLarge4002Lines,
  textHeadingLarge,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Divider as MDivider } from "@mui/material";

export const sectionGrid = css`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, 1fr);
`;

export const Section = styled.section`
  width: 100%;
`;

export const SectionLayout = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1232px;
  padding: 56px 16px;

  ${mediaTabletUp} {
    padding: 64px 16px;
  }
`;

export const SectionHeadline = styled.div`
  align-self: flex-start;
  display: grid;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  ${textHeadingLarge};
  font-size: 30px;
  letter-spacing: -0.8px;
  line-height: 40px;
  margin: 0;
`;

export const SectionSubtitle = styled.h3`
  ${textBodyLarge4002Lines};
  color: ${inkLight};
  margin: 0;
`;

export const SectionActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${mediaTabletUp} {
    flex-direction: row;
  }
`;

export const SectionDivider = styled(MDivider)`
  border-bottom-width: 3px;
  border-color: transparent;
  border-image: linear-gradient(
      to right,
      #f9b9a5 0 25%,
      #e8e678 25% 50%,
      #cdeef2 50% 75%,
      #97b9ce 75% 100%
    )
    1; // border-image-slice is 1 by default for linear-gradients.
`;

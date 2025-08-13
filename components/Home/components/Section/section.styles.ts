import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Divider as MDivider } from "@mui/material";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { typographyToCSS } from "@databiosphere/findable-ui/lib/styles/common/mixins/typography";

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

  ${bpUpSm} {
    padding: 64px 16px;
  }
`;

export const SectionHeadline = styled.div`
  align-self: flex-start;
  display: grid;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  ${typographyToCSS("heading-large")};
  font-size: 30px;
  letter-spacing: -0.8px;
  line-height: 40px;
  margin: 0;
`;

export const SectionSubtitle = styled.h3`
  color: ${PALETTE.INK_LIGHT};
  font: ${FONT.BODY_LARGE_400_2_LINES};
  margin: 0;
`;

export const SectionActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${bpUpSm} {
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

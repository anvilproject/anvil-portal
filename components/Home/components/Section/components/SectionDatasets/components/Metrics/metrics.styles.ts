import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { bpUp1024 } from "../../../../../../../../styles/common/mixins/breakpoints";
import { sectionGrid } from "../../../../section.styles";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { typographyToCSS } from "@databiosphere/findable-ui/lib/styles/common/mixins/typography";

export const Metrics = styled.div`
  ${sectionGrid};

  ${bpUp1024} {
    grid-column: 7 / -1;
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const Metric = styled.div`
  align-self: flex-start;
  display: grid;
  gap: 0 8px;
  grid-column: auto / span 4;
  justify-content: flex-start;

  .MuiDivider-root {
    border: none;
    border-left: 3px solid transparent;
    grid-row: 1 / 3;
    margin-top: 4px;
  }

  &:nth-of-type(1) {
    .MuiDivider-root {
      border-color: #f9b9a5;
    }
  }

  &:nth-of-type(2) {
    .MuiDivider-root {
      border-color: #e8e678;
    }
  }

  &:nth-of-type(3) {
    .MuiDivider-root {
      border-color: #97b9ce;
    }
  }

  ${bpUpSm} {
    grid-column: auto / span 2;
  }

  ${bpUp1024} {
    gap: 0 16px;

    .MuiDivider-root {
      margin-top: 8px;
    }
  }
`;

export const Count = styled.div`
  font-size: 24px;
  font-weight: 500;
  grid-column: 2;
  letter-spacing: -0.4px;
  line-height: 34px;
  padding-top: 1px;

  ${bpUp1024} {
    ${typographyToCSS("heading-xlarge")};
    padding: 0;
  }
`;

export const Label = styled.div`
  color: ${PALETTE.INK_LIGHT};
  font: ${FONT.BODY_SMALL_400_2_LINES};
  grid-column: 2;
  margin-top: -4px;
  padding-bottom: 1px;

  ${bpUp1024} {
    font: ${FONT.BODY_400};
    padding: 0;
  }
`;

import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import {
  textBody400,
  textBodySmall4002Lines,
  textHeadingXLarge,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { mediaTabletLargeUp } from "../../../../../../../../styles/common/mixins/breakpoints";
import { sectionGrid } from "../../../../section.styles";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const Metrics = styled.div`
  ${sectionGrid};

  ${mediaTabletLargeUp} {
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

  ${mediaTabletUp} {
    grid-column: auto / span 2;
  }

  ${mediaTabletLargeUp} {
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

  ${mediaTabletLargeUp} {
    ${textHeadingXLarge};
    padding: 0;
  }
`;

export const Label = styled.div`
  ${textBodySmall4002Lines};
  color: ${PALETTE.INK_LIGHT};
  grid-column: 2;
  margin-top: -4px;
  padding-bottom: 1px;

  ${mediaTabletLargeUp} {
    ${textBody400};
    padding: 0;
  }
`;

import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const CardDate = styled.div`
  align-items: flex-start;
  background-color: ${PALETTE.INFO_LIGHTEST};
  border: 1px solid ${PALETTE.INFO_LIGHT};
  border-radius: 4px;
  color: ${PALETTE.INFO_MAIN};
  display: grid;
  height: 64px;
  justify-items: center;
  padding: 8px;

  .MuiTypography-body-small-500 {
    margin-top: -4px;
  }

  ${bpUpSm} {
    height: 80px;
    padding: 12px;
  }
`;

import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const Card = styled.div`
  align-items: flex-start;
  background-color: ${PALETTE.PRIMARY_LIGHTEST};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
  padding: 24px;

  ${bpUpSm} {
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const IconWrapper = styled.div`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  border-radius: 50%;
  color: ${PALETTE.PRIMARY_MAIN};
  display: flex;
  flex: none;
  height: 48px;
  justify-content: center;
  width: 48px;
`;

export const Text = styled.div`
  display: grid;
  flex: 1;
  gap: 4px;
  min-width: 240px;
`;

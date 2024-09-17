import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import {
  infoLight,
  infoLightest,
  infoMain,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";

export const CardDate = styled.div`
  align-items: flex-start;
  background-color: ${infoLightest};
  border: 1px solid ${infoLight};
  border-radius: 4px;
  color: ${infoMain};
  display: grid;
  height: 64px;
  justify-items: center;
  padding: 8px;

  .MuiTypography-text-body-small-500 {
    margin-top: -4px;
  }

  ${mediaTabletUp} {
    height: 80px;
    padding: 12px;
  }
`;

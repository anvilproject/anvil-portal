import { ToggleButtonGroup as DXToggleButtonGroup } from "@databiosphere/findable-ui/lib/components/common/ToggleButtonGroup/toggleButtonGroup";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import {
  SectionActions as DefaultActions,
  SectionHeadline as DefaultHeadline,
} from "../../section.styles";

export const Headline = styled(DefaultHeadline)`
  grid-column: 1 / -1;
  justify-items: center; /* required for toggle button */
  text-align: center;

  ${bpUpSm} {
    grid-column: 4 / span 6;
  }
`;

export const ToggleButtonGroup = styled(DXToggleButtonGroup)`
  .MuiToggleButton-root {
    min-width: 150px;
    padding: 8px 16px;
    text-transform: none;
  }
`;

export const SectionActions = styled(DefaultActions)`
  align-items: center;
  grid-column: 1 / -1;
  justify-content: center;
`;

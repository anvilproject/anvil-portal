import { ToggleButtonGroup as DXToggleButtonGroup } from "@clevercanary/data-explorer-ui/lib/components/common/ToggleButtonGroup/toggleButtonGroup";
import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import {
  sectionGrid,
  SectionHeadline as DefaultHeadline,
  SectionLayout as DefaultLayout,
} from "../../section.styles";

export const SectionLayout = styled(DefaultLayout)`
  ${sectionGrid};
  gap: 48px 16px;
`;

export const Headline = styled(DefaultHeadline)`
  grid-column: 1 / -1;
  justify-items: center; /* required for toggle button */
  text-align: center;

  ${mediaTabletUp} {
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

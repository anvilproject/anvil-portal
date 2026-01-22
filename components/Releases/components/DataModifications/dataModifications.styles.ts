import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";

export const StyledMarkdownRenderer = styled(MarkdownRenderer)`
  code {
    background-color: ${PALETTE.SMOKE_MAIN};
    border-radius: 4px;
    display: inline-block;
    font: ${FONT.BODY_SMALL_400};
    margin: 2px 0;
    padding: 4px 8px;
  }
`;

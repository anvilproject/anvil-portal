import styled from "@emotion/styled";
import { ContentOverviewView } from "../ContentOverviewView/contentOverviewView";
import { bpDownMd } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";

const CONTENT_WIDTH = 756;
const NAVIGATION_WIDTH = 280;
const OUTLINE_WIDTH = 280;
const PADDING = 40;

const MARGIN = NAVIGATION_WIDTH + CONTENT_WIDTH + OUTLINE_WIDTH;

export const StyledContentOverviewView = styled(ContentOverviewView)`
  .MuiTableContainer-root {
    width: min(
      calc(100vw - 32px),
      calc((100vw + ${MARGIN}px) / 2 - ${NAVIGATION_WIDTH}px - ${PADDING}px)
    );
  }

  ${bpDownMd} {
    .MuiTableContainer-root {
      width: 100%;
    }
  }
`;

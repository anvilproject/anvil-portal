import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";
import { ROUTES } from "../../../../routes/constants";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  TEAM: "team",
};
const PATH_SEGMENTS = {
  OVERSIGHT_COMMITTEE: "oversight-committee",
  TEAM: "team",
  WORKING_GROUPS: "working-groups",
};

export const TEAM: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.TEAM,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "Leadership Team", url: `${ROUTES.TEAM}` },
        {
          label: "Working Groups",
          url: `${ROUTES.TEAM}/${PATH_SEGMENTS.WORKING_GROUPS}`,
        },
        {
          label: "Oversight Committee",
          url: `${ROUTES.TEAM}/${PATH_SEGMENTS.OVERSIGHT_COMMITTEE}`,
        },
      ],
      slugs: [
        PATH_SEGMENTS.OVERSIGHT_COMMITTEE,
        PATH_SEGMENTS.TEAM,
        PATH_SEGMENTS.WORKING_GROUPS,
      ],
    },
  ],
};

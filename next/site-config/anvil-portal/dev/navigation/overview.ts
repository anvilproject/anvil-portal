import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";
import { ROUTES } from "../../../../routes/constants";
import { FLATTEN, VISIBLE } from "../../../common/constants";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  OVERVIEW: "overview",
};
const PATH_SEGMENTS = {
  CITE_ANVIL: "cite-anvil",
  OVERVIEW: "overview",
  PROJECT_SPONSOR: "project-sponsor",
  PUBLICATIONS: "publications",
  SECURITY: "security",
};

export const OVERVIEW: NavigationEntry = {
  nodes: [
    {
      flatten: FLATTEN.MD_DOWN,
      key: NODE_KEYS.OVERVIEW,
      label: "Overview",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "What is AnVIL?",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: ROUTES.OVERVIEW,
        },
        {
          label: "Platform and Data Security",
          url: `${ROUTES.OVERVIEW}/${PATH_SEGMENTS.SECURITY}`,
        },
        {
          label: "Supported by NHGRI",
          url: `${ROUTES.OVERVIEW}/${PATH_SEGMENTS.PROJECT_SPONSOR}`,
        },
        {
          label: "Publications",
          url: `${ROUTES.OVERVIEW}/${PATH_SEGMENTS.PUBLICATIONS}`,
        },
        {
          label: "Citing AnVIL",
          url: `${ROUTES.OVERVIEW}/${PATH_SEGMENTS.CITE_ANVIL}`,
        },
      ],
      slugs: [
        PATH_SEGMENTS.CITE_ANVIL,
        PATH_SEGMENTS.OVERVIEW,
        PATH_SEGMENTS.PROJECT_SPONSOR,
        PATH_SEGMENTS.PUBLICATIONS,
        PATH_SEGMENTS.SECURITY,
      ],
      url: ROUTES.OVERVIEW,
      visible: VISIBLE.MD_DOWN,
    },
  ],
};

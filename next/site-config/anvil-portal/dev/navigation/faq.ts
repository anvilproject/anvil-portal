import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";
import { ROUTES } from "../../../../routes/constants";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  FAQ: "faq",
};
const PATH_SEGMENTS = {
  DATA_SECURITY: "data-security",
  DATA_SUBMISSION: "data-submission",
  FAQ: "faq",
  RESOURCES_FOR_ANVIL_USERS: "resources-for-anvil-users",
  USING_ANVIL: "using-anvil",
};

export const FAQ: NavigationEntry = {
  nodes: [
    {
      flatten: { sm: true, xs: true },
      key: NODE_KEYS.FAQ,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "Overview",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: ROUTES.FAQ,
        },
        {
          label: "Data Security, Management, and Access Procedures",
          url: `${ROUTES.FAQ}/${PATH_SEGMENTS.DATA_SECURITY}`,
        },
        {
          label: "Data Submission",
          url: `${ROUTES.FAQ}/${PATH_SEGMENTS.DATA_SUBMISSION}`,
        },
        {
          label: "Resources for AnVIL Users",
          url: `${ROUTES.FAQ}/${PATH_SEGMENTS.RESOURCES_FOR_ANVIL_USERS}`,
        },
        {
          label: "Using AnVIL",
          url: `${ROUTES.FAQ}/${PATH_SEGMENTS.USING_ANVIL}`,
        },
      ],
      slugs: [
        PATH_SEGMENTS.DATA_SECURITY,
        PATH_SEGMENTS.DATA_SUBMISSION,
        PATH_SEGMENTS.FAQ,
        PATH_SEGMENTS.RESOURCES_FOR_ANVIL_USERS,
        PATH_SEGMENTS.USING_ANVIL,
      ],
      url: ROUTES.FAQ,
      visible: { lg: false, md: false },
    },
  ],
};

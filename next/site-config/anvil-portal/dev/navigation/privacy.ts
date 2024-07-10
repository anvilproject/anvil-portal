import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  PRIVACY: "privacy",
};
const PATH_SEGMENTS = {
  PRIVACY: "privacy",
};

export const PRIVACY: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.PRIVACY,
      layoutStyle: LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
      slugs: [PATH_SEGMENTS.PRIVACY],
    },
  ],
};

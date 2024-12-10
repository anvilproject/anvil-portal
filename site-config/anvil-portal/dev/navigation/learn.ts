import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  LEARN: "learn",
};
const PATH_SEGMENTS = {
  LEARN: "learn",
};

export const LEARN: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.LEARN,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      slugs: [PATH_SEGMENTS.LEARN],
    },
  ],
};

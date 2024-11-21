import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  ANVIL_CHAMPIONS: "anvil-champions",
};
const PATH_SEGMENTS = {
  ANVIL_CHAMPIONS: "anvil-champions",
};

export const ANVIL_CHAMPIONS: NavigationEntry = {
  nodes: [
    {
      enableOutline: false,
      key: NODE_KEYS.ANVIL_CHAMPIONS,
      layoutStyle: LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
      slugs: [PATH_SEGMENTS.ANVIL_CHAMPIONS],
    },
  ],
};

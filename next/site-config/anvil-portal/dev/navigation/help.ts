import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  HELP: "help",
};
const PATH_SEGMENTS = {
  HELP: "help",
};

export const HELP: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.HELP,
      layoutStyle: LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
      slugs: [PATH_SEGMENTS.HELP],
    },
  ],
};

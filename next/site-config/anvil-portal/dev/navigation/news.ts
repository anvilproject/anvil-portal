import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  NEWS: "news",
};
const PATH_SEGMENTS = {
  NEWS: "news",
};

export const NEWS: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.NEWS,
      slugs: [PATH_SEGMENTS.NEWS],
    },
  ],
};

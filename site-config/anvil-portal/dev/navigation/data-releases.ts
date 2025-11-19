import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  DATA_RELEASES: "data-releases",
};
const PATH_SEGMENTS = {
  DATA_RELEASES: "data-releases",
};

export const DATA_RELEASES: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.DATA_RELEASES,
      slugs: [PATH_SEGMENTS.DATA_RELEASES],
    },
  ],
};

import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  RELEASES: "releases",
};
const PATH_SEGMENTS = {
  RELEASES: "releases",
};

export const RELEASES: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.RELEASES,
      slugs: [PATH_SEGMENTS.RELEASES],
    },
  ],
};

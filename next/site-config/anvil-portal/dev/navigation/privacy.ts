import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  PRIVACY: "privacy",
};

export const PRIVACY: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.PRIVACY,
      slugs: [],
    },
  ],
};

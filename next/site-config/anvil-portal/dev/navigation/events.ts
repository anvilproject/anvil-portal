import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  EVENTS: "events",
};

export const EVENTS: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.EVENTS,
      slugs: [],
    },
  ],
};

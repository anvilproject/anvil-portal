import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  EVENTS: "events",
};
const PATH_SEGMENTS = {
  EVENTS: "events",
};

export const EVENTS: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.EVENTS,
      slugs: [PATH_SEGMENTS.EVENTS],
    },
  ],
};

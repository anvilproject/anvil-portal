import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  HELP: "help",
};

export const HELP: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.HELP,
      slugs: [],
    },
  ],
};

import { NavigationEntry, NavigationNode } from "docs/common/entities";

/**
 * Returns the navigation entry with nodes filtered by node key.
 * @param entry - Entry.
 * @param key - Node key.
 * @returns Navigation entry with filtered nodes.
 */
export function filterConsortiaNavigationEntry(
  entry: NavigationEntry,
  key: NavigationNode["key"]
): NavigationEntry {
  const cloneEntry = { ...entry };
  const nodes = entry.nodes.filter((node) => node.key === key);
  cloneEntry.nodes = nodes;
  return cloneEntry;
}

import { VISIBILITY_MODE } from "./entities";

/**
 * Resets visibility mode.
 * @param isExpanded - Whether the section should be expanded (default).
 * @returns visibility mode.
 */
export function resetVisibilityMode(isExpanded: boolean): VISIBILITY_MODE {
  return isExpanded ? VISIBILITY_MODE.EXPANDED : VISIBILITY_MODE.COLLAPSED;
}

/**
 * Updates visibility mode; toggles mode from expanded to collapsed and vice versa.
 * @param currentMode - Current visibility mode.
 * @returns visibility mode.
 */
export function updateVisibilityMode(
  currentMode: VISIBILITY_MODE
): VISIBILITY_MODE {
  return currentMode === VISIBILITY_MODE.COLLAPSED
    ? VISIBILITY_MODE.EXPANDED
    : VISIBILITY_MODE.COLLAPSED;
}

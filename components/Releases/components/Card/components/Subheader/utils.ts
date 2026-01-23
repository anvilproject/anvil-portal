import { ReactNode } from "react";
import { BaseReleaseData } from "../../../../data/types";

/**
 * Renders the study identifier for a release.
 * If there is a child PHS ID, it returns both parent and child IDs.
 * Otherwise, it returns just the PHS ID.
 * @param release - The release object containing PHS IDs.
 * @returns The formatted study identifier.
 */
export function renderStudyIdentifier(
  release: Pick<BaseReleaseData, "childPhsId" | "phsId">
): ReactNode {
  if (!release.childPhsId) return release.phsId;

  return `${release.phsId} (parent), ${release.childPhsId} (child)`;
}

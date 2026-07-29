import { ReactNode } from "react";
import { BaseReleaseData } from "../../../../data/types";

/**
 * Returns the subheader parts for a release, omitting the study identifier when
 * the release has no PHS ID. Without this, studies registered as "N/A" render a
 * leading separator with nothing before it.
 * @param release - The release object containing PHS IDs and DULs.
 * @returns The subheader parts, in display order.
 */
export function getSubheaderParts(
  release: Pick<BaseReleaseData, "childPhsId" | "duls" | "phsId">
): ReactNode[] {
  const parts: ReactNode[] = [];
  const studyIdentifier = renderStudyIdentifier(release);
  if (studyIdentifier) parts.push(studyIdentifier);
  parts.push(release.duls.join(", ") || "No DULs");
  return parts;
}

/**
 * Renders the study identifier for a release.
 * If both parent and child PHS IDs are present, it returns both, labelled.
 * Otherwise, it returns whichever ID is present, or null when neither is.
 * @param release - The release object containing PHS IDs.
 * @returns The formatted study identifier.
 */
export function renderStudyIdentifier(
  release: Pick<BaseReleaseData, "childPhsId" | "phsId">
): ReactNode {
  if (!release.phsId) return release.childPhsId ?? null;
  if (!release.childPhsId) return release.phsId;

  return `${release.phsId} (parent), ${release.childPhsId} (child)`;
}

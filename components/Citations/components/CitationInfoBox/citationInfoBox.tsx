import Link from "next/link";
import { JSX } from "react";
import { Alert } from "../../../index";

/**
 * Citation info box displayed above the citations entity list.
 * @returns Alert component with citation instructions.
 */
export function CitationInfoBox(): JSX.Element {
  return (
    <Alert
      severity="info"
      sx={{ "& .MuiAlert-message": { overflow: "hidden", py: 0 } }}
    >
      <span style={{ whiteSpace: "nowrap" }}>
        Using AnVIL in your research? Please see{" "}
        <Link href="/overview/cite-anvil">Citing AnVIL</Link> for citation
        guidelines.
      </span>
    </Alert>
  );
}

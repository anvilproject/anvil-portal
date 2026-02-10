import { Link as MLink } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { Alert } from "../../../index";
import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";
import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/FluidPaper/fluidPaper";

/**
 * Citation info box displayed above the citations entity list.
 * @returns Alert component with citation instructions.
 */
export function CitationInfoBox(): JSX.Element {
  return (
    <Alert {...ALERT_PROPS.STANDARD_INFO} component={FluidPaper}>
      <span>
        Using AnVIL in your research? Please see{" "}
        <MLink component={Link} href="/overview/cite-anvil">
          Citing AnVIL
        </MLink>{" "}
        for citation guidelines.
      </span>
    </Alert>
  );
}

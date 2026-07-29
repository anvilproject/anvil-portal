import { Fragment, JSX } from "react";
import { BaseReleaseData } from "../../../../data/types";
import { StyledBox, StyledDot } from "./subheader.styles";
import { getSubheaderParts } from "./utils";

export const Subheader = (
  props: Pick<BaseReleaseData, "childPhsId" | "duls" | "phsId">
): JSX.Element | null => {
  return (
    <StyledBox>
      {getSubheaderParts(props).map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <StyledDot />}
          <span>{part}</span>
        </Fragment>
      ))}
    </StyledBox>
  );
};

import { Dot } from "@databiosphere/findable-ui/lib/components/common/Dot/dot";
import { BaseReleaseData } from "../../../../data/types";
import { STACK_PROPS } from "./constants";
import { StyledStack } from "./subheader.styles";
import { renderStudyIdentifier } from "./utils";

export const Subheader = (
  props: Pick<BaseReleaseData, "childPhsId" | "duls" | "phsId">
): JSX.Element | null => {
  return (
    <StyledStack {...STACK_PROPS}>
      <span>{renderStudyIdentifier(props)}</span>
      <Dot />
      <span>{props.duls.join(", ") || "No DULs"}</span>
    </StyledStack>
  );
};

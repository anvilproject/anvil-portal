import { Dot } from "@databiosphere/findable-ui/lib/components/common/Dot/dot";
import { STACK_PROPS } from "./constants";
import { StyledStack } from "./subheader.styles";
import { Props } from "./types";
import { renderStudyIdentifier } from "./utils";

export const Subheader = (props: Props): JSX.Element | null => {
  return (
    <StyledStack {...STACK_PROPS}>
      <span>{renderStudyIdentifier(props)}</span>
      <Dot />
      <span>{props.duls.join(", ") || "No DULs"}</span>
    </StyledStack>
  );
};

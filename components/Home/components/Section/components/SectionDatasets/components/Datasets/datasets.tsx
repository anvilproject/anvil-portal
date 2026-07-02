import { ButtonTextPrimary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "@databiosphere/findable-ui/lib/hooks/useBreakpointHelper";
import { JSX, useState } from "react";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { VISIBILITY_MODE_LABEL } from "../../../../../../common/constants";
import { VISIBILITY_MODE } from "../../../../../../common/entities";
import {
  resetVisibilityMode,
  updateVisibilityMode,
} from "../../../../../../common/utils";
import { Cards } from "./components/Cards/cards";
import { Grid } from "./datasets.styles";

export const Datasets = (): JSX.Element => {
  const bpUpSm = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "sm");
  const { datasetCards: cards } = useSectionsData();
  const [mode, setMode] = useState<VISIBILITY_MODE>(VISIBILITY_MODE.COLLAPSED);
  const [prevBpUpSm, setPrevBpUpSm] = useState<boolean>();
  const isExpanded = mode === VISIBILITY_MODE.EXPANDED;

  // Reset visibility mode whenever the breakpoint changes, adjusting state
  // during render (rather than in an effect) by tracking the previous value.
  if (bpUpSm !== prevBpUpSm) {
    setPrevBpUpSm(bpUpSm);
    setMode(resetVisibilityMode(bpUpSm));
  }

  // Toggles visibility mode.
  const onVisibilityMode = (): void => {
    setMode(updateVisibilityMode);
  };

  return (
    <Grid isExpanded={isExpanded}>
      <Cards cards={cards} />
      <ButtonTextPrimary onClick={onVisibilityMode}>
        {VISIBILITY_MODE_LABEL[mode]}
      </ButtonTextPrimary>
    </Grid>
  );
};

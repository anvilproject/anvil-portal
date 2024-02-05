import { ButtonTextPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "@clevercanary/data-explorer-ui/lib/hooks/useBreakpointHelper";
import { TABLET } from "@clevercanary/data-explorer-ui/lib/theme/common/breakpoints";
import { useEffect, useState } from "react";
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
  const tabletUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, TABLET);
  const { datasetCards: cards } = useSectionsData();
  const [mode, setMode] = useState<VISIBILITY_MODE>(VISIBILITY_MODE.COLLAPSED);
  const isExpanded = mode === VISIBILITY_MODE.EXPANDED;

  // Toggles visibility mode.
  const onVisibilityMode = (): void => {
    setMode(updateVisibilityMode);
  };

  // Resets visibility mode on breakpoint change.
  useEffect(() => {
    setMode(resetVisibilityMode(tabletUp));
  }, [tabletUp]);

  return (
    <Grid isExpanded={isExpanded}>
      <Cards cards={cards} />
      <ButtonTextPrimary onClick={onVisibilityMode}>
        {VISIBILITY_MODE_LABEL[mode]}
      </ButtonTextPrimary>
    </Grid>
  );
};

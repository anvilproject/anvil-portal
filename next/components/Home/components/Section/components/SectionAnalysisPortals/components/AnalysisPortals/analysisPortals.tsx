import { Fragment, useRef } from "react";
import { Bullets } from "../../../../../Bullets/bullets";
import { Grid } from "./analysisPortals.styles";
import { Cards } from "./components/Cards/cards";
import { useInteractivePortals } from "./hooks/useInteractivePortals";

export const AnalysisPortals = (): JSX.Element => {
  const portalsRef = useRef<HTMLDivElement>(null);
  const {
    activeIndex,
    interactionEnabled,
    interactiveAction,
    interactiveCards,
    interactiveIndexes,
    onSetActiveIndex,
  } = useInteractivePortals(portalsRef);
  return (
    <Fragment>
      <Grid
        ref={portalsRef}
        interactionEnabled={interactionEnabled}
        {...interactiveAction}
      >
        <Cards cards={interactiveCards} />
      </Grid>
      {interactionEnabled && (
        <Bullets
          activeBullet={activeIndex}
          bullets={interactiveIndexes}
          onBullet={onSetActiveIndex}
        />
      )}
    </Fragment>
  );
};

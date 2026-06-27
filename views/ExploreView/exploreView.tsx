import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { ExploreView as DXExploreView } from "@databiosphere/findable-ui/lib/views/ExploreView/exploreView";
import { JSX, useEffect, useState } from "react";

export const ExploreView = (
  props: AzulEntitiesStaticResponse
): JSX.Element | null => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Temporary work-around for race-condition issue with ExploreState's ProcessExploreResponse and ResetExploreResponse.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-shot mount flag for the race-condition work-around noted above; refactor tracked in #3991
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return <DXExploreView {...props} />;
};

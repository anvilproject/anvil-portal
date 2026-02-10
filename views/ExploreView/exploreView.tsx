import { JSX, useEffect, useState } from "react";
import { ExploreView as DXExploreView } from "@databiosphere/findable-ui/lib/views/ExploreView/exploreView";
import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";

export const ExploreView = (
  props: AzulEntitiesStaticResponse
): JSX.Element | null => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return <DXExploreView {...props} />;
};

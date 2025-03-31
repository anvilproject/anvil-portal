import { Banner as DXBanner } from "@databiosphere/findable-ui/lib/components/common/Banner/banner";
import { useRouter } from "next/router";
import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Banner/constants";

export const Banner = (): JSX.Element | null => {
  const { asPath } = useRouter();
  if (asPath !== "/") return null;
  return (
    <DXBanner {...ALERT_PROPS}>
      <i>
        This repository is under review for potential modification in compliance
        with Administration directives.
      </i>
    </DXBanner>
  );
};

import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import {
  Brands,
  HHSLogo,
  NHGRILogo,
  NIHLogo,
  USAGOVLogo,
} from "./anvilBranding.styles";

export const ANVILBranding = (): JSX.Element => {
  return (
    <Brands>
      <NHGRILogo
        alt="NHGRI"
        height={24}
        link="https://www.genome.gov/"
        src="/consortia/logos/nhgri.svg"
        target={ANCHOR_TARGET.BLANK}
      />
      <NIHLogo
        alt="NIH"
        height={24}
        link="https://www.nih.gov/"
        src="/consortia/logos/nih.svg"
        target={ANCHOR_TARGET.BLANK}
      />
      <HHSLogo
        alt="HHS"
        height={32}
        link="https://www.hhs.gov/"
        src="/consortia/logos/hhs.svg"
        target={ANCHOR_TARGET.BLANK}
      />
      <USAGOVLogo
        alt="USA.GOV"
        height={32}
        link="https://www.usa.gov/"
        src="/consortia/logos/usagov.png"
        target={ANCHOR_TARGET.BLANK}
      />
    </Brands>
  );
};

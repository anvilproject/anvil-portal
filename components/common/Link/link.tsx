import { TypographyWordBreak } from "@databiosphere/findable-ui/lib/components/common/Typography/TypographyWordBreak/TypographyWordBreak";
import { Link as DXLink } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { replaceParameters } from "@databiosphere/findable-ui/lib/utils/replaceParameters";
import { EMAIL_ADDRESSES, PATH_PARAMETERS } from "../../../common/constants";
import { SiteConfig } from "../../../site-config/common/entities";

/**
 * Basic anchor link component, used by MDX for all anchor links.
 * Takes in children and href as props, and passes them to the DXLink component.
 */

export const Link = ({
  ...props /* Spread props to allow for anchor link specific props e.g. "href". */
}): JSX.Element => {
  const { children, href, ...linkProps } = props;
  const { config } = useConfig();
  const { browserURL, portalURL } = config as SiteConfig;
  return (
    <DXLink
      label={<TypographyWordBreak>{children}</TypographyWordBreak>}
      url={encodeURI(
        replaceParameters(decodeURI(href), {
          ...EMAIL_ADDRESSES,
          ...PATH_PARAMETERS,
          browserURL,
          portalURL,
        })
      )}
      {...linkProps}
    />
  );
};

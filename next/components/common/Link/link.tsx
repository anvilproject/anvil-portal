import { Link as DXLink } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { useConfig } from "../../../hooks/useConfig";

/**
 * Basic anchor link component, used by MDX for all anchor links.
 * Takes in children and href as props, and passes them to the DXLink component.
 */

export const Link = ({
  ...props /* Spread props to allow for anchor link specific props e.g. "href". */
}): JSX.Element => {
  const { children, href } = props;
  const {
    config: { portalURL },
  } = useConfig();
  return <DXLink label={children} url={getURL(href, portalURL)} />;
};

/**
 * If the URL contains "{portalURL}", replace it with the portalURL.
 * @param url - URL.
 * @param portalURL - Portal URL.
 * @returns URL.
 */
function getURL(url: string, portalURL: string): string {
  const decodedUrl = decodeURI(url);
  return decodedUrl.replace(/{portalURL}/g, portalURL);
}

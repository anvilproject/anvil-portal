import { CustomSVGIconProps } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/common/entities";
import { SvgIcon } from "@mui/material";
import React from "react";

/**
 * Custom code pull request icon.
 */

export const CodePullRequestIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M10.4004 1.85887C10.6423 1.96574 10.7998 2.20762 10.7998 2.4748V3.5998H11.2498C13.2382 3.5998 14.8498 5.21137 14.8498 7.1998L14.8498 11.8882C15.6457 12.2342 16.1998 13.0273 16.1998 13.9498C16.1998 15.1929 15.1929 16.1998 13.9498 16.1998C12.7067 16.1998 11.6998 15.1929 11.6998 13.9498C11.6998 13.0273 12.2539 12.2342 13.0498 11.8882L13.0498 7.1998C13.0498 6.20699 12.2426 5.3998 11.2498 5.3998H10.7998V6.5248C10.7998 6.79199 10.6423 7.03387 10.4004 7.14074C10.1586 7.24762 9.87168 7.20543 9.6748 7.02543L7.4248 5.00043C7.28137 4.87105 7.20262 4.69105 7.20262 4.4998C7.20262 4.30855 7.28418 4.12574 7.4248 3.99918L9.6748 1.97418C9.87168 1.79699 10.1586 1.75199 10.4004 1.85887ZM4.7248 4.0498C4.7248 3.87078 4.65369 3.69909 4.5271 3.57251C4.40051 3.44592 4.22883 3.3748 4.0498 3.3748C3.87078 3.3748 3.69909 3.44592 3.57251 3.57251C3.44592 3.69909 3.3748 3.87078 3.3748 4.0498C3.3748 4.22883 3.44592 4.40051 3.57251 4.5271C3.69909 4.65369 3.87078 4.7248 4.0498 4.7248C4.22883 4.7248 4.40051 4.65369 4.5271 4.5271C4.65369 4.40051 4.7248 4.22883 4.7248 4.0498ZM4.9498 6.11137L4.9498 11.8854C5.74574 12.2314 6.2998 13.0245 6.2998 13.947C6.2998 15.1901 5.29293 16.197 4.0498 16.197C2.80668 16.197 1.7998 15.1901 1.7998 13.947C1.7998 13.0245 2.35387 12.2314 3.1498 11.8854L3.1498 6.11137C2.35387 5.76543 1.7998 4.9723 1.7998 4.0498C1.7998 2.80668 2.80668 1.7998 4.0498 1.7998C5.29293 1.7998 6.2998 2.80668 6.2998 4.0498C6.2998 4.9723 5.74574 5.76543 4.9498 6.11137ZM4.7248 13.9498C4.7248 13.7708 4.65369 13.5991 4.5271 13.4725C4.40051 13.3459 4.22883 13.2748 4.0498 13.2748C3.87078 13.2748 3.69909 13.3459 3.57251 13.4725C3.44592 13.5991 3.3748 13.7708 3.3748 13.9498C3.3748 14.1288 3.44592 14.3005 3.57251 14.4271C3.69909 14.5537 3.87078 14.6248 4.0498 14.6248C4.22883 14.6248 4.40051 14.5537 4.5271 14.4271C4.65369 14.3005 4.7248 14.1288 4.7248 13.9498ZM13.9498 14.6248C14.1288 14.6248 14.3005 14.5537 14.4271 14.4271C14.5537 14.3005 14.6248 14.1288 14.6248 13.9498C14.6248 13.7708 14.5537 13.5991 14.4271 13.4725C14.3005 13.3459 14.1288 13.2748 13.9498 13.2748C13.7708 13.2748 13.5991 13.3459 13.4725 13.4725C13.3459 13.5991 13.2748 13.7708 13.2748 13.9498C13.2748 14.1288 13.3459 14.3005 13.4725 14.4271C13.5991 14.5537 13.7708 14.6248 13.9498 14.6248Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
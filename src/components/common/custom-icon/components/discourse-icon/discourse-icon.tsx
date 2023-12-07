import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

/**
 * Custom Discourse icon (socials).
 */

export const DiscourseIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M9.02808 2.7002C5.59683 2.7002 2.69995 5.48457 2.69995 8.91582C2.69995 9.0002 2.69995 15.3002 2.69995 15.3002H9.02808C12.4875 15.3002 15.3 12.4314 15.3 9.0002C15.3 5.59707 12.4875 2.7002 9.02808 2.7002ZM8.99995 12.6002C8.43745 12.6002 7.9312 12.4877 7.45308 12.2627L5.17495 12.8252L5.82183 10.7158C5.54058 10.2096 5.39995 9.64707 5.39995 9.0002C5.39995 7.03145 7.00308 5.4002 8.99995 5.4002C10.9687 5.4002 12.6 7.03145 12.6 9.0002C12.6 10.9971 10.9687 12.6002 8.99995 12.6002Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

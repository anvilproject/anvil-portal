import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

/**
 * Custom YouTube icon (socials).
 */

export const YouTubeIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M16.3547 5.31523C16.1859 4.64023 15.6515 4.10586 15.0047 3.93711C13.7953 3.59961 9.01405 3.59961 9.01405 3.59961C9.01405 3.59961 4.20468 3.59961 2.9953 3.93711C2.34843 4.10586 1.81405 4.64023 1.6453 5.31523C1.3078 6.49648 1.3078 9.02773 1.3078 9.02773C1.3078 9.02773 1.3078 11.5309 1.6453 12.7402C1.81405 13.4152 2.34843 13.9215 2.9953 14.0902C4.20468 14.3996 9.01405 14.3996 9.01405 14.3996C9.01405 14.3996 13.7953 14.3996 15.0047 14.0902C15.6515 13.9215 16.1859 13.4152 16.3547 12.7402C16.6922 11.5309 16.6922 9.02773 16.6922 9.02773C16.6922 9.02773 16.6922 6.49648 16.3547 5.31523ZM7.43905 11.3059V6.74961L11.4328 9.02773L7.43905 11.3059Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

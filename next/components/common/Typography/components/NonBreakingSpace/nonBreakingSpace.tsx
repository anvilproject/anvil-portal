import { Typography } from "@mui/material";
import { ReactNode } from "react";

export interface NonBreakingSpaceProps {
  children: ReactNode;
}

export const NonBreakingSpace = ({
  children,
  ...props /* Spread props to allow for Typography specific props e.g. "color". */
}: NonBreakingSpaceProps): JSX.Element => {
  return (
    <Typography component="span" sx={{ whiteSpace: "nowrap" }} {...props}>
      {children}
    </Typography>
  );
};

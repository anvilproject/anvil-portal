import { TEXT_BODY_SMALL_400_2_LINES } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

export interface SubheaderProps {
  children: ReactNode;
}

export const Subheader = ({ children }: SubheaderProps): JSX.Element => {
  return (
    <Typography
      component="div"
      color="ink.light"
      variant={TEXT_BODY_SMALL_400_2_LINES}
      mb={4}
      mt={2}
    >
      {children}
    </Typography>
  );
};

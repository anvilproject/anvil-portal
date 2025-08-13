import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export interface SubheaderProps {
  children: ReactNode;
}

export const Subheader = ({ children }: SubheaderProps): JSX.Element => {
  return (
    <Typography
      component="div"
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
      mb={4}
      mt={2}
    >
      {children}
    </Typography>
  );
};

import { TEXT_BODY_LARGE_400_2_LINES } from "@databiosphere/findable-ui/lib/theme/common/typography";
import {
  Typography as MTypography,
  TypographyProps as MTypographyProps,
} from "@mui/material";
import { ElementType, ReactNode } from "react";

export interface TextBodyLarge4002LinesProps
  extends Omit<MTypographyProps, "component"> {
  children: ReactNode;
  component?: ElementType;
}

export const TextBodyLarge4002Lines = ({
  children,
  component = "div",
  variant = TEXT_BODY_LARGE_400_2_LINES,
  ...props /* Spread props to allow for Typography specific props e.g. "color". */
}: TextBodyLarge4002LinesProps): JSX.Element => {
  return (
    <MTypography component={component} variant={variant} {...props}>
      {children}
    </MTypography>
  );
};

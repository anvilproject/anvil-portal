import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";

export const TextBodyLarge4002Lines = ({
  component = "div",
  variant = TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400_2_LINES,
  ...props
}: TypographyProps): JSX.Element => {
  return <Typography component={component} variant={variant} {...props} />;
};

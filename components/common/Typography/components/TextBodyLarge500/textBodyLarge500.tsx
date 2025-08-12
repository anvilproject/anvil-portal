import { Typography, TypographyProps } from "@mui/material";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const TextBodyLarge500 = ({
  component = "div",
  ...props
}: TypographyProps): JSX.Element => {
  return (
    <Typography
      component={component}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
      {...props}
    />
  );
};

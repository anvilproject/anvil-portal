import { TEXT_BODY_SMALL_400_2_LINES } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Grid2Props, TypographyProps } from "@mui/material";

export const GRID2_PROPS: Partial<Grid2Props> = {
  container: true,
  direction: { sm: "row", xs: "column" },
  gap: 4,
  spacing: 4,
};

export const TYPOGRAPHY_PROPS: Partial<TypographyProps> = {
  color: "ink.light",
  component: "div",
  variant: TEXT_BODY_SMALL_400_2_LINES,
};

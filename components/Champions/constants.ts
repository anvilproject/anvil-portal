import { GridProps, TypographyProps } from "@mui/material";
import { TYPOGRAPHY_PROPS as MUI_TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const GRID_PROPS: Partial<GridProps> = {
  container: true,
  direction: { sm: "row", xs: "column" },
  gap: 4,
  spacing: 4,
};

export const TYPOGRAPHY_PROPS: Partial<TypographyProps> = {
  color: MUI_TYPOGRAPHY_PROPS.COLOR.INK_LIGHT,
  component: "div",
  variant: MUI_TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES,
};

import { CardProps, SvgIconProps } from "@mui/material";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { TYPOGRAPHY_PROPS as MUI_TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const CARD_PROPS: CardProps = {
  component: RoundedPaper,
};

export const SVG_ICON_PROPS: SvgIconProps = {
  color: "primary",
  fontSize: "small",
  sx: { gridColumn: 2, gridRow: 1, p: 2.5 },
};

export const TYPOGRAPHY_PROPS = {
  color: MUI_TYPOGRAPHY_PROPS.COLOR.INK_LIGHT,
  variant: MUI_TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES,
};

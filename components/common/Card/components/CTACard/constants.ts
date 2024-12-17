import { CardProps, SvgIconProps } from "@mui/material";
import { TEXT_BODY_400_2_LINES } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";

export const CARD_PROPS: CardProps = {
  component: RoundedPaper,
};

export const SVG_ICON_PROPS: SvgIconProps = {
  color: "primary",
  fontSize: "small",
  sx: { gridColumn: 2, gridRow: 1, p: 2.5 },
};

export const TYPOGRAPHY_PROPS = {
  color: "ink.light",
  variant: TEXT_BODY_400_2_LINES,
};

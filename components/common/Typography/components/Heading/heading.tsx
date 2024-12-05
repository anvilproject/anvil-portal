import { AnchorLink } from "@databiosphere/findable-ui/lib/components/common/AnchorLink/anchorLink";
import { TEXT_HEADING_LARGE } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography, TypographyProps } from "@mui/material";
import { slugifyHeading } from "../../../../../plugins/common/utils";

export interface HeadingProps {
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  enableAnchor?: boolean;
  headingValue: string;
  headingValueSlug?: string;
  sx?: TypographyProps["sx"];
  variant?: TypographyProps["variant"];
}

export const Heading = ({
  component = "h1",
  enableAnchor = true,
  headingValue,
  headingValueSlug = slugifyHeading(headingValue),
  sx = { mb: 2 },
  variant = TEXT_HEADING_LARGE,
}: HeadingProps): JSX.Element => {
  return (
    <Typography
      component={component}
      id={headingValueSlug}
      sx={{ ...sx, position: "relative" }}
      variant={variant}
    >
      {headingValue}
      {enableAnchor && <AnchorLink anchorLink={headingValueSlug} />}
    </Typography>
  );
};

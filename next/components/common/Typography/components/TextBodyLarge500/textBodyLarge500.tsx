import { TEXT_BODY_LARGE_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ElementType, ReactNode } from "react";

export interface TextBodyLarge500Props {
  children: ReactNode;
  component?: ElementType;
}

export const TextBodyLarge500 = ({
  children,
  component = "div",
  ...props /* Spread props to allow for Typography specific props e.g. "color". */
}: TextBodyLarge500Props): JSX.Element => {
  return (
    <Typography component={component} variant={TEXT_BODY_LARGE_500} {...props}>
      {children}
    </Typography>
  );
};

import { Dot } from "@databiosphere/findable-ui/lib/components/common/Dot/dot";
import { Typography } from "@mui/material";
import { Fragment, JSX } from "react";
import { CardOverline as Overline } from "./cardOverline.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

interface CardOverlineProps {
  values: string[];
}

export const CardOverline = ({
  values,
}: CardOverlineProps): JSX.Element | null => {
  if (!values.length) return null;
  return (
    <Overline
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
    >
      {values.map((value, i) => (
        <Fragment key={i}>
          {i > 0 && <Dot />}
          <Typography key={i} component="span">
            {value}
          </Typography>
        </Fragment>
      ))}
    </Overline>
  );
};

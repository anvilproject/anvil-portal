import { Dot } from "@databiosphere/findable-ui/lib/components/common/Dot/dot";
import { TEXT_BODY_SMALL_400_2_LINES } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { CardOverline as Overline } from "./cardOverline.styles";

interface CardOverlineProps {
  values: string[];
}

export const CardOverline = ({
  values,
}: CardOverlineProps): JSX.Element | null => {
  if (!values.length) return null;
  return (
    <Overline color="ink.light" variant={TEXT_BODY_SMALL_400_2_LINES}>
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

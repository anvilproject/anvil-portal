import { Typography } from "@mui/material";
import { JSX } from "react";
import { CardDate as Date } from "./cardDate.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

interface CardDateProps {
  date: string;
}

export const CardDate = ({ date }: CardDateProps): JSX.Element => {
  const [month, day] = date.split(",");
  return (
    <Date>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}>
        {day}
      </Typography>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500}>
        {month}
      </Typography>
    </Date>
  );
};

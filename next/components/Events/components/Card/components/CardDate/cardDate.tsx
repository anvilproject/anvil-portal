import {
  TEXT_BODY_SMALL_500,
  TEXT_HEADING_LARGE,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React from "react";
import { CardDate as Date } from "./cardDate.styles";

interface CardDateProps {
  date: string;
}

export const CardDate = ({ date }: CardDateProps): JSX.Element => {
  const [month, day] = date.split(",");
  return (
    <Date>
      <Typography variant={TEXT_HEADING_LARGE}>{day}</Typography>
      <Typography variant={TEXT_BODY_SMALL_500}>{month}</Typography>
    </Date>
  );
};

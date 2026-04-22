import { Divider } from "@mui/material";
import { JSX } from "react";
import { METRICS } from "./constants";
import {
  Count,
  Metrics as DatasetMetrics,
  Label,
  Metric,
} from "./metrics.styles";

export const Metrics = (): JSX.Element => {
  return (
    <DatasetMetrics>
      {METRICS.map(([label, count]) => (
        <Metric key={label}>
          <Divider flexItem orientation="vertical" />
          <Count>{count}</Count>
          <Label>{label}</Label>
        </Metric>
      ))}
    </DatasetMetrics>
  );
};

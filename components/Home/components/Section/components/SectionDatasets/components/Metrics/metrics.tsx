import { Divider } from "@mui/material";
import {
  Count,
  Metrics as DatasetMetrics,
  Label,
  Metric,
} from "./metrics.styles";
import { METRICS } from "./constants";

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

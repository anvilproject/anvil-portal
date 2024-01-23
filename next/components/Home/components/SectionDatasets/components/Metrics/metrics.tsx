import { Divider } from "@mui/material";
import {
  Count,
  Label,
  Metric,
  Metrics as DatasetMetrics,
} from "./metrics.styles";

export const Metrics = (): JSX.Element => {
  return (
    <DatasetMetrics>
      <Metric>
        <Divider flexItem orientation="vertical" />
        <Count>500+</Count>
        <Label>Cohorts</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" />
        <Count>4000+</Count>
        <Label>Terabytes</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" />
        <Count>600k+</Count>
        <Label>Participants</Label>
      </Metric>
    </DatasetMetrics>
  );
};

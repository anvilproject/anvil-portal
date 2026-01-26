import { Chip } from "@mui/material";
import { JSX } from "react";
import { StyledStack } from "./datasets.styles";
import { Props } from "./types";

export const Datasets = ({ datasetsAffected }: Props): JSX.Element | null => {
  if (!datasetsAffected || datasetsAffected.length === 0) return null;
  return (
    <StyledStack direction="row" flexWrap="wrap" gap={1} useFlexGap>
      {datasetsAffected.map((dataset) => (
        <Chip key={dataset} label={dataset} variant="ntag" />
      ))}
    </StyledStack>
  );
};

import { StyledContainer } from "./gridTable.styles";
import { Props } from "./types";

export const GridTable = ({ ...props }: Props): JSX.Element => {
  return <StyledContainer disableGutters maxWidth={false} {...props} />;
};

import { primaryMain } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";
import { Grid2Props } from "@mui/material";

type Props = Grid2Props & {
  nth: number;
};

export const GroupOverview = styled.div`
  .MuiDivider-root,
  .MuiTypography-text-heading {
    grid-column: 1 / -1;
  }

  .MuiDivider-root {
    margin: 32px 0;
  }

  .MuiTypography-text-heading {
    line-height: 34px;
  }
`;

export const StyledList = styled("ul")<Props>`
  display: grid;
  gap: 0 64px;
  grid-auto-flow: dense;
  grid-column: 1 / -1;
  grid-template-columns: 1fr 1fr;
  list-style-position: inside;
  margin-top: 8px;
  padding-left: 0;

  li {
    grid-column: 1;
    margin: 4px 0;
    padding-left: 24px; // required for list-style-position: inside; allows for market to be positioned inside the list item.
    text-indent: -15px; // required for list-style-position: inside; centering marker; half of the 24px width and half marker width @ 6px.

    &:nth-of-type(n + ${(props) => props.nth}) {
      grid-column: 2;
    }

    > * {
      margin-left: -6px; // required for list-style-position: inside; assists with vertical alignment of list item; difference between indent and padding adjustments and half of the marker width.
    }

    &::marker {
      color: ${primaryMain};
    }
  }
`;

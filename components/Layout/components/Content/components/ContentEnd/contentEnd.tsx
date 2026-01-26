import { Fragment, JSX } from "react";
import { Contribute } from "./components/Contribute/contribute";
import { StyledDivider } from "./components/Divider/divider.styles";

interface ContentEndProps {
  slug?: string[];
}

export const ContentEnd = ({ slug }: ContentEndProps): JSX.Element => {
  return (
    <Fragment>
      <StyledDivider />
      <Contribute slug={slug} />
    </Fragment>
  );
};

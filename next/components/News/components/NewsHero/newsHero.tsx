import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { Fragment } from "react";
import { FrontmatterNews } from "../../../../content/entities";
import { ROUTES } from "../../../../routes/constants";
import { Heading } from "../../../common/Typography/components/Heading/heading";
import { Subheader } from "../../../common/Typography/components/Subheader/subheader";

export const NewsHero = ({ ...props }: FrontmatterNews): JSX.Element => {
  return (
    <Fragment>
      <Breadcrumbs
        breadcrumbs={[
          { path: ROUTES.NEWS, text: "News" },
          { path: "", text: props.title },
        ]}
      />
      <Heading headingValue={props.title} />
      <Subheader>{props.date}</Subheader>
    </Fragment>
  );
};

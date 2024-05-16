import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { Fragment, ReactNode } from "react";
import { FrontmatterNews } from "../../../../content/entities";
import { ROUTES } from "../../../../routes/constants";
import { Subheader } from "../../../common/Typography/components/Subheader/subheader";

interface NewsHeroProps extends FrontmatterNews {
  children: ReactNode; // Title e.g. "# News Title"
}

export const NewsHero = ({ ...props }: NewsHeroProps): JSX.Element => {
  return (
    <Fragment>
      <Breadcrumbs
        breadcrumbs={[
          { path: ROUTES.NEWS, text: "News" },
          { path: "", text: props.title },
        ]}
      />
      {props.children}
      <Subheader>{props.date}</Subheader>
    </Fragment>
  );
};

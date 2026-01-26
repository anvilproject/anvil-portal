import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { JSX } from "react";

export const BreadcrumbsNews = (): JSX.Element => {
  return (
    <Breadcrumbs
      breadcrumbs={[
        {
          path: "/consortia",
          text: "Consortia",
        },
        {
          path: "",
          text: "CSER",
        },
        {
          path: "/consortia/cser/news",
          text: "News",
        },
      ]}
    />
  );
};

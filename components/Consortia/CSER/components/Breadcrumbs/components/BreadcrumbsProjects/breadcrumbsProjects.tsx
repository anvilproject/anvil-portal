import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { JSX } from "react";

export const BreadcrumbsProjects = (): JSX.Element => {
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
          path: "/consortia/cser/projects",
          text: "Projects",
        },
      ]}
    />
  );
};

import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";

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

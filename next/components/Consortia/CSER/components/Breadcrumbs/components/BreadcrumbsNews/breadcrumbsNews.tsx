import { Breadcrumbs } from "@clevercanary/data-explorer-ui/lib/components/common/Breadcrumbs/breadcrumbs";

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

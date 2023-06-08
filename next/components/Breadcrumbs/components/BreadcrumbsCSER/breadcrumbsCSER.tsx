import { Breadcrumbs } from "@clevercanary/data-explorer-ui/lib/components/common/Breadcrumbs/breadcrumbs";

export interface BreadcrumbsCSERProps {
  lastCrumb: string;
}

export const BreadcrumbsCSER = ({
  lastCrumb,
}: BreadcrumbsCSERProps): JSX.Element => {
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
          path: "",
          text: lastCrumb,
        },
      ]}
    />
  );
};

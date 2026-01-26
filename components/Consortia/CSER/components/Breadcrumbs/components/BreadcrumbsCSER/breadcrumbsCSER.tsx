import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { JSX } from "react";

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

import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { JSX } from "react";
import { BaseReleaseData } from "../../../../data/types";

export const Title = ({
  studyName,
  studyUrl,
}: Pick<BaseReleaseData, "studyName" | "studyUrl">): JSX.Element => {
  return <Link label={studyName} url={studyUrl ?? ""} />;
};

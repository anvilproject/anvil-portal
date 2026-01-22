import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { Props } from "./types";

export const Title = ({ studyName, studyUrl }: Props): JSX.Element => {
  return <Link label={studyName} url={studyUrl ?? ""} />;
};

import * as C from "../..";
import { Link } from "../../common/Link/link";
import { GridTable } from "../../common/Table/components/GridTable/gridTable";
import { NewDataReleases } from "../components/NewDataReleases/newDataReleases";

export const MDX_COMPONENTS = {
  AnchorLink: C.AnchorLink,
  Breadcrumbs: C.Breadcrumbs,
  Figure: C.Figure,
  GridTable,
  NewDataReleases,
  a: Link,
};

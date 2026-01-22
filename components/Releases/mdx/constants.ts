import * as C from "../..";
import { Link } from "../../common/Link/link";
import { GridTable } from "../../common/Table/components/GridTable/gridTable";
import { DataAdditions } from "../components/DataAdditions/dataAdditions";
import { DataModifications } from "../components/DataModifications/dataModifications";

export const MDX_COMPONENTS = {
  AnchorLink: C.AnchorLink,
  Breadcrumbs: C.Breadcrumbs,
  DataAdditions,
  DataModifications,
  Figure: C.Figure,
  GridTable,
  a: Link,
};

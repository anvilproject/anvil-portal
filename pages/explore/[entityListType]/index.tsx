import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { getEntityService } from "@databiosphere/findable-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { seedDatabase } from "@databiosphere/findable-ui/lib/utils/seedDatabase";
import { ExploreView } from "@databiosphere/findable-ui/lib/views/ExploreView/exploreView";
import type { ExploreViewProps } from "@databiosphere/findable-ui/lib/views/ExploreView/types";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { JSX } from "react";
import { config } from "../../../config/config";

/**
 * Entity list page for explore views (citations, workflows, etc.).
 * @param props - Static props: the entity list type and its statically loaded entities.
 * @returns ExploreView with entity data.
 */
const ExplorePage = (props: ExploreViewProps): JSX.Element => {
  return <ExploreView {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const appConfig = config();
  const paths = appConfig.entities.map((entity) => ({
    params: { entityListType: entity.route },
  }));
  return { fallback: false, paths };
};

/**
 * Builds the static props for an explore page: its entity list type, page metadata and statically loaded entities.
 * @param context - Static props context.
 * @param context.params - Route params, including the entity list type.
 * @returns Static props for the explore page.
 */
export const getStaticProps: GetStaticProps<ExploreViewProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const entityListType = params?.entityListType as string;
  const appConfig = config();
  const entityConfig = getEntityConfig(appConfig.entities, entityListType);
  const { exploreMode, label } = entityConfig;
  const { fetchAllEntities } = getEntityService(entityConfig, undefined);

  const props: ExploreViewProps & {
    pageDescription?: string;
    pageTitle?: string;
  } = {
    entityListType,
    pageDescription:
      typeof label === "string"
        ? `Browse ${label.toLowerCase()} on the AnVIL platform.`
        : undefined,
    pageTitle: typeof label === "string" ? label : undefined,
  };

  if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
    await seedDatabase(entityListType, entityConfig);
  }

  props.data = (await fetchAllEntities(entityListType, undefined)).hits;

  return { props };
};

export default ExplorePage;

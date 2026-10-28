import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { getEntityService } from "@databiosphere/findable-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { seedDatabase } from "@databiosphere/findable-ui/lib/utils/seedDatabase";
import { ExploreView } from "@databiosphere/findable-ui/lib/views/ExploreView/exploreView";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { JSX } from "react";
import { config } from "../../../config/config";

/**
 * Entity list page for explore views (citations, workflows, etc.).
 * @param props - Static props including entity data.
 * @returns ExploreView with entity data.
 */
const ExplorePage = (props: AzulEntitiesStaticResponse): JSX.Element => {
  return <ExploreView {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const appConfig = config();
  const paths = appConfig.entities.map((entity) => ({
    params: { entityListType: entity.route },
  }));
  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<
  AzulEntitiesStaticResponse
> = async ({ params }: GetStaticPropsContext) => {
  const entityListType = params?.entityListType as string;
  const appConfig = config();
  const entityConfig = getEntityConfig(appConfig.entities, entityListType);
  const { exploreMode, label } = entityConfig;
  const { fetchAllEntities } = getEntityService(entityConfig, undefined);

  const props: AzulEntitiesStaticResponse & {
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

  props.data = await fetchAllEntities(entityListType, undefined);

  return { props };
};

export default ExplorePage;

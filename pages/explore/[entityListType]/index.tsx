import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main.styles";
import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { getEntityService } from "@databiosphere/findable-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { database } from "@databiosphere/findable-ui/lib/utils/database";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { JSX } from "react";
import { config } from "../../../config/config";
import { readFile } from "../../../utils/readFile";
import { ExploreView } from "../../../views/ExploreView/exploreView";

/**
 * Seeds the in-memory database with static JSON data.
 * @param entityListType - Entity list type.
 * @param entityConfig - Entity config.
 */
async function seedDatabase(
  entityListType: string,
  entityConfig: EntityConfig
): Promise<void> {
  const { label, staticLoadFile } = entityConfig;
  if (!staticLoadFile) {
    throw new Error(`staticLoadFile not found for entity ${label}`);
  }
  const rawData = readFile(staticLoadFile);
  const object = JSON.parse(rawData);
  const entities = Object.values(object);
  database.get().seed(entityListType, entities);
}

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

  const props: AzulEntitiesStaticResponse & { pageTitle?: string } = {
    entityListType,
    pageTitle: typeof label === "string" ? label : undefined,
  };

  if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
    await seedDatabase(entityListType, entityConfig);
  }

  props.data = await fetchAllEntities(entityListType, undefined);

  return { props };
};

ExplorePage.Main = DXMain;

export default ExplorePage;

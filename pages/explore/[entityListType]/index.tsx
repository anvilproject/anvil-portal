import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main.styles";
import { MainProps } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main";
import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { getEntityService } from "@databiosphere/findable-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { database } from "@databiosphere/findable-ui/lib/utils/database";
import { ExploreView } from "@databiosphere/findable-ui/lib/views/ExploreView/exploreView";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { JSX, useEffect, useState } from "react";
import { config } from "../../../config/config";
import { readFile } from "../../../utils/readFile";
import { NextPageWithComponent } from "../../_app";

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
 * Delays rendering until the explore state provider's initial reset effect has
 * fired, preventing a race condition where ResetExploreResponse wipes data set
 * by ProcessExploreResponse on full page refresh.
 * @returns Whether the explore state is ready for child consumers.
 */
function useExploreReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}

/**
 * Entity list page for explore views (citations, workflows, etc.).
 * @param props - Static props including entity data.
 * @returns ExploreView with entity data.
 */
const ExplorePage = (props: AzulEntitiesStaticResponse): JSX.Element => {
  const isReady = useExploreReady();
  if (!isReady) return <></>;
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

/**
 * Main layout wrapper without header offset margin.
 * @param props - Main layout props.
 * @param props.children - Page content.
 * @param props.className - CSS class name.
 * @returns Main element.
 */
const ExploreMain = ({ children, className }: MainProps): JSX.Element => (
  <DXMain className={className}>{children}</DXMain>
);

(ExplorePage as NextPageWithComponent).Main = ExploreMain;

export default ExplorePage;

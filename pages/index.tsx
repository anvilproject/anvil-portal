import { GetStaticProps, InferGetStaticPropsType } from "next";
import { JSX } from "react";
import { DIR_NAME as EVENTS_DIR_NAME } from "../components/Events/common/constants";
import { Footer } from "../components/Home/components/Layout/components/Footer/footer.styles";
import { Main } from "../components/Home/components/Layout/components/Main/main";
import { buildAnalysisPortalCards } from "../components/Home/components/Section/components/SectionAnalysisPortals/common/utils";
import { CARDS as CLOUD_CARDS } from "../components/Home/components/Section/components/SectionCloudEnvironment/common/content";
import { CARDS as DATASET_CARDS } from "../components/Home/components/Section/components/SectionDatasets/common/utils";
import { buildToolsAndWorkflowsCards } from "../components/Home/components/Section/components/SectionExplore/common/utils";
import { buildCarouselCards } from "../components/Home/components/Section/components/SectionHero/common/utils";
import { buildPublicationSectionCards } from "../components/Home/components/Section/components/SectionPublications/common/utils";
import {
  buildUpdateSectionCards,
  filterEventFrontmatter,
  filterNewsFrontmatter,
} from "../components/Home/components/Section/components/SectionUpdates/common/utils";
import { CARDS as WORKSPACE_CARDS } from "../components/Home/components/Section/components/SectionWorkspaces/common/content";
import { DIR_NAME as NEWS_DIR_NAME } from "../components/News/common/constants";
import { config } from "../config/config";
import { SectionsData, SectionsDataProvider } from "../providers/sectionsData";
import { HomeView } from "../views/HomeView/homeView";

export const getStaticProps: GetStaticProps<SectionsData> = async () => {
  const { browserURL } = config();
  const analysisPortalCards = buildAnalysisPortalCards(browserURL);
  const carouselCards = buildCarouselCards();
  const cloudCards = CLOUD_CARDS;
  const datasetCards = DATASET_CARDS;
  const toolsAndWorkflowsCards = buildToolsAndWorkflowsCards(browserURL);
  const eventCards = buildUpdateSectionCards(
    EVENTS_DIR_NAME,
    filterEventFrontmatter
  );
  const newsCards = buildUpdateSectionCards(
    NEWS_DIR_NAME,
    filterNewsFrontmatter
  );
  const publicationCards = buildPublicationSectionCards();
  const workspaceCards = WORKSPACE_CARDS;
  return {
    props: {
      analysisPortalCards,
      carouselCards,
      cloudCards,
      datasetCards,
      eventCards,
      newsCards,
      publicationCards,
      toolsAndWorkflowsCards,
      workspaceCards,
    },
  };
};

export const Home = ({
  analysisPortalCards,
  carouselCards,
  cloudCards,
  datasetCards,
  eventCards,
  newsCards,
  publicationCards,
  toolsAndWorkflowsCards,
  workspaceCards,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SectionsDataProvider
      value={{
        analysisPortalCards,
        carouselCards,
        cloudCards,
        datasetCards,
        eventCards,
        newsCards,
        publicationCards,
        toolsAndWorkflowsCards,
        workspaceCards,
      }}
    >
      <HomeView />
    </SectionsDataProvider>
  );
};

Home.Main = Main;
Home.Footer = Footer;

export default Home;

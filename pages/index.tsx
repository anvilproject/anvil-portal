import { GetStaticProps, InferGetStaticPropsType } from "next";
import { JSX } from "react";
import { Footer } from "../components/Home/components/Layout/components/Footer/footer.styles";
import { Main } from "../components/Home/components/Layout/components/Main/main";
import { buildAnalysisPortalCards } from "../components/Home/components/Section/components/SectionAnalysisPortals/common/utils";
import { CARDS as CLOUD_CARDS } from "../components/Home/components/Section/components/SectionCloudEnvironment/common/content";
import { CARDS as DATASET_CARDS } from "../components/Home/components/Section/components/SectionDatasets/common/utils";
import { buildCarouselCards } from "../components/Home/components/Section/components/SectionHero/common/utils";
import { buildPublicationSectionCards } from "../components/Home/components/Section/components/SectionPublications/common/utils";
import { buildToolsAndWorkflowsCards } from "../components/Home/components/Section/components/SectionExplore/common/utils";
import { buildUpdateSectionCards } from "../components/Home/components/Section/components/SectionUpdates/common/utils";
import { CARDS as WORKSPACE_CARDS } from "../components/Home/components/Section/components/SectionWorkspaces/common/content";
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
  const eventCards = buildUpdateSectionCards("events");
  const newsCards = buildUpdateSectionCards("news");
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

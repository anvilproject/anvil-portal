import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Footer } from "../components/Home/components/Layout/components/Footer/footer.styles";
import { Main } from "../components/Home/components/Layout/components/Main/main";
import { CARDS as ANALYSIS_PORTAL_CARDS } from "../components/Home/components/Section/components/SectionAnalysisPortals/components/AnalysisPortals/common/content";
import { CARDS as CLOUD_CARDS } from "../components/Home/components/Section/components/SectionCloudEnvironment/components/CloudBenefits/common/content";
import { CARDS as DATASET_CARDS } from "../components/Home/components/Section/components/SectionDatasets/components/Datasets/common/content";
import { CARDS as CAROUSEL_CARDS } from "../components/Home/components/Section/components/SectionHero/components/Carousel/common/content";
import { buildContentSectionCards } from "../components/Home/components/Section/components/SectionUpdates/components/Updates/common/utils";
import { CARDS as WORKSPACE_CARDS } from "../components/Home/components/Section/components/SectionWorkspaces/components/Workspaces/common/content";
import { SectionsData, SectionsDataProvider } from "../providers/sectionsData";
import { HomeView } from "../views/HomeView/homeView";

export const getStaticProps: GetStaticProps<SectionsData> = async () => {
  const analysisPortalCards = ANALYSIS_PORTAL_CARDS;
  const carouselCards = CAROUSEL_CARDS;
  const cloudCards = CLOUD_CARDS;
  const datasetCards = DATASET_CARDS;
  const eventCards = buildContentSectionCards("events");
  const newsCards = buildContentSectionCards("news");
  const workspaceCards = WORKSPACE_CARDS;
  return {
    props: {
      analysisPortalCards,
      carouselCards,
      cloudCards,
      datasetCards,
      eventCards,
      newsCards,
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

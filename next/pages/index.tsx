import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Footer } from "../components/Home/components/Layout/components/Footer/footer.styles";
import { Main } from "../components/Home/components/Layout/components/Main/main";
import { CARDS as ANALYSIS_PORTAL_CARDS } from "../components/Home/components/Section/components/SectionAnalysisPortals/common/content";
import { CARDS as CLOUD_CARDS } from "../components/Home/components/Section/components/SectionCloudEnvironment/common/content";
import { CARDS as DATASET_CARDS } from "../components/Home/components/Section/components/SectionDatasets/common/content";
import { CARDS as CAROUSEL_CARDS } from "../components/Home/components/Section/components/SectionHero/common/content";
import { buildPublicationSectionCards } from "../components/Home/components/Section/components/SectionPublications/common/utils";
import { buildUpdateSectionCards } from "../components/Home/components/Section/components/SectionUpdates/common/utils";
import { CARDS as WORKSPACE_CARDS } from "../components/Home/components/Section/components/SectionWorkspaces/common/content";
import { SectionsData, SectionsDataProvider } from "../providers/sectionsData";
import { HomeView } from "../views/HomeView/homeView";

export const getStaticProps: GetStaticProps<SectionsData> = async () => {
  const analysisPortalCards = ANALYSIS_PORTAL_CARDS;
  const carouselCards = CAROUSEL_CARDS;
  const cloudCards = CLOUD_CARDS;
  const datasetCards = DATASET_CARDS;
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

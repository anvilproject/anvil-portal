import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Footer } from "../components/Home/components/Layout/components/Footer/footer.styles";
import { Main } from "../components/Home/components/Layout/components/Main/main";
import { CARDS as ANALYSIS_PORTAL_CARDS } from "../components/Home/components/SectionAnalysisPortals/components/AnalysisPortals/common/content";
import { CARDS as CAROUSEL_CARDS } from "../components/Home/components/SectionHero/components/Carousel/common/content";
import { SectionsData, SectionsDataProvider } from "../providers/sectionsData";
import { HomeView } from "../views/HomeView/homeView";

export const getStaticProps: GetStaticProps<SectionsData> = async () => {
  const analysisPortalCards = ANALYSIS_PORTAL_CARDS;
  const carouselCards = CAROUSEL_CARDS;
  return {
    props: {
      analysisPortalCards,
      carouselCards,
    },
  };
};

export const Home = ({
  analysisPortalCards,
  carouselCards,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SectionsDataProvider value={{ analysisPortalCards, carouselCards }}>
      <HomeView />
    </SectionsDataProvider>
  );
};

Home.Main = Main;
Home.Footer = Footer;

export default Home;

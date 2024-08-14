import { LAYOUT_STYLE_NO_CONTRAST_LIGHT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { GetStaticProps } from "next";
import { ContentView } from "../../components";
import { Search } from "../../components/Search/search";

const SearchPage = (): JSX.Element => {
  return (
    <ContentView
      content={<Search />}
      layoutStyle={LAYOUT_STYLE_NO_CONTRAST_LIGHT}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "Search",
    },
  };
};

export default SearchPage;

SearchPage.Main = Main;

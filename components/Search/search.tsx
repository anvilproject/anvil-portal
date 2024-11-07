import { LoadingIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/LoadingIcon/loadingIcon";
import { Tabs } from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";
import { NoResults } from "@databiosphere/findable-ui/lib/components/NoResults/noResults";
import { Fragment } from "react";
import { Heading } from "../common/Typography/components/Heading/heading";
import { TABS } from "./common/constants";
import { Pagination } from "./components/Pagination/pagination";
import { Results } from "./components/Results/results";
import { useSearch } from "./hooks/useSearch";
import { useSearchCategory } from "./hooks/useSearchCategory";
import { SearchView } from "./search.styles";

export const Search = (): JSX.Element => {
  const { isLoading, isSuccess, isValid, onSearch, pagination, results } =
    useSearch();
  const { category, onChangeCategory } = useSearchCategory();
  return (
    <SearchView>
      <Heading enableAnchor={false} headingValue="Search" />
      <Tabs onTabChange={onChangeCategory} tabs={TABS} value={category} />
      {isValid ? (
        <Fragment>
          {isLoading && <LoadingIcon color="primary" fontSize="medium" />}
          {isSuccess && (
            <Fragment>
              <Results results={results} />
              <Pagination onSearch={onSearch} pagination={pagination} />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <NoResults title="Please enter a search term." />
      )}
    </SearchView>
  );
};

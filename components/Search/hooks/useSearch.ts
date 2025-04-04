import { CardProps } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { SiteConfig } from "../../../site-config/common/entities";
import {
  OnSearchFn,
  SearchPagination,
  SearchResponse,
  SearchResponseError,
} from "./common/entities";
import {
  getRequestURL,
  isRequestValid,
  mapSearchPagination,
  mapSearchResults,
} from "./common/utils";
import { useFetchSearch } from "./useFetchSearch";

type Response = SearchResponse | SearchResponseError;

export interface UseSearch {
  isLoading: boolean;
  isSuccess: boolean;
  isValid: boolean;
  onSearch: OnSearchFn;
  pagination?: SearchPagination;
  results?: CardProps[];
}

/**
 * Hook facilitating search functionality and results.
 * @returns search results.
 */
export const useSearch = (): UseSearch => {
  const { config } = useConfig();
  const { portalURL } = config as SiteConfig;
  const { asPath } = useRouter();
  const [requestURL, setRequestURL] = useState<string>();
  const { isIdle, isLoading, isSuccess, response } =
    useFetchSearch<Response>(requestURL);
  const requestParams = useSearchParams();

  const onSearch = useCallback(
    ({ searchIndex = 0, searchParams = requestParams }): void => {
      setRequestURL(getRequestURL(portalURL, searchParams, searchIndex));
    },
    [portalURL, requestParams]
  );

  useEffect(() => {
    onSearch({ searchParams: requestParams });
  }, [onSearch, requestParams]);

  return {
    isLoading: isIdle || isLoading,
    isSuccess: isSuccess,
    isValid: isRequestValid(asPath),
    onSearch,
    pagination: mapSearchPagination(response),
    results: mapSearchResults(response),
  };
};

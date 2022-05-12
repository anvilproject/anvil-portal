/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dashboard filter provider component.
 */

// Core dependencies
import lunr from "lunr";
import React, { useCallback, useEffect, useRef, useState } from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";
import { SelectionControl } from "../dashboard-search-facet/dashboard-search-facet";
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";
import { GAEntityType } from "../../../utils/anvil-gtm/ga-entity-type.model";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";
import * as DashboardSummaryService from "../../../utils/dashboard/dashboard-summary.service";
import FacetSelectionControl from "../../../utils/dashboard/facet-selection-control.model";

// Template dependencies
const lunrSearchPrefix = {
  AND: "+",
  NAND: "-",
  OR: "",
};

function ProviderDashboard(props) {
  const {
    children,
    dashboardIndexFileName,
    dashboardURL,
    panelCount,
    rowsByRowKey,
    setOfEntities,
    setOfSummaryKeyTerms,
    setOfTermsByFacet,
    summaryKey,
    tableHeadersEntities,
    tableHeadersSummary,
    termGroupsByFacet,
    termGroupsByTermByFacet,
    termSearchValueByTermDisplay,
    totalsWarning,
  } = props;
  const inputValueRef = useRef("");
  const lastHitRef = useRef({ facet: "", selected: false, term: "" });
  const operatorBySelectedTermsByFacetRef = useRef(new Map());
  const searchURLRef = useRef(null);
  const selectedTermOperatorsByFacetRef = useRef(new Map());
  const setOfResultsByFacetRef = useRef(new Map());
  const [dashboardIndex, setDashboardIndex] = useState({
    index: {},
    indexMounted: false,
  });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    entities: [],
    facets: [],
    summaries: [],
  });
  const { index, indexMounted } = dashboardIndex;
  const { entities, facets, summaries } = results;
  const regWhiteSpace = /\s\s+/g;
  const warning = totalsWarning ? (
    <span>
      <sup>* </sup>Totals are adjusted for project data hosted in multiple{" "}
      {summaryKey}.
    </span>
  ) : null;

  /**
   * Returns the current query.
   * @returns {string}
   */
  const getCurrentQuery = useCallback(() => {
    /* The ref searchURL keeps track of the url. */
    const url = new URL(searchURLRef.current);
    return url.searchParams.get("query") || "";
  }, []);

  /**
   * Pushes an updated url to window history.
   * Updates the ref SearchURL.
   * @type {(function(*=): void)|*}
   */
  const updateDashboardURL = useCallback((newQuery) => {
    /* Create new url from the existing dashboard url. */
    const url = new URL(searchURLRef.current);
    const currentQuery = url.searchParams.get("query");

    /* No need to update dashboard url if both current and new query are undefined. */
    if (!currentQuery && !newQuery) return;
    /* No need to update dashboard url as new query is the same as current query. */
    /* Prevents unnecessary pushes to window history. */
    if (currentQuery === newQuery) return;

    /* Add or remove search params from the url. */
    /* If there is a current query set the search params to the url. */
    if (newQuery) {
      /* Set the search params. */
      url.searchParams.set("query", newQuery);
    } else {
      /* Otherwise, delete the search params from the url. */
      url.searchParams.delete("query");
    }

    /* Grab the new url string. */
    const { href } = url;

    /* Update ref searchURL. */
    searchURLRef.current = href;

    /* Add the new url to the session history stack. */
    window.history.pushState(null, "", href);
  }, []);

  /**
   * Updates state query, search and dashboard url, and executes tracking.
   * @type {(function(): void)|*}
   */
  const updateQueryAndExecuteTracking = useCallback(() => {
    /* Grab the current selectedTermOperatorsByFacet. */
    const selectedTermOperatorsByFacet = getSelectedTermOperatorsByFacet();

    /* Update the ref selectedTermOperatorsByFacet. */
    selectedTermOperatorsByFacetRef.current = selectedTermOperatorsByFacet;

    /* Convert selected terms to valid query string object. */
    const newQuery = new URLSearchParams(
      selectedTermOperatorsByFacet
    ).toString();

    /* Grab the current query. */
    const currentQuery = getCurrentQuery();

    /* Update dashboard url and ref SearchURL. */
    updateDashboardURL(newQuery);

    /* Grab the last hit values. */
    const { facet, selected, term } = lastHitRef.current;

    /** Execute tracking for facet "search" - TODO. */
    if (facet === "search") {
      AnvilGTMService.trackSearchInput(
        term,
        newQuery,
        currentQuery,
        GAEntityType.WORKSPACE
      );
    } else {
      /* Execute tracking for all other facets - TODO. */
      if (term) {
        AnvilGTMService.trackSearchFacetSelected(
          facet,
          term,
          selected,
          newQuery,
          currentQuery,
          GAEntityType.WORKSPACE
        );
      }
    }

    /* Update state query. */
    setQuery(newQuery);
  }, [getCurrentQuery, updateDashboardURL]);

  /**
   * Returns the facets with filtered terms and counts.
   * @type {function(*): *[]}
   */
  const buildFacets = useCallback(
    (entitiesByFacet) => {
      /* Build the facets object. */
      const newFacets = [];

      /* Loop through each facet and the corresponding set of terms. */
      for (const [facet, setOfTerms] of setOfTermsByFacet) {
        /* Exclude the "search" facet as it is not part of the facet selector group. */
        if (facet === "search") {
          continue;
        }

        /* Grab the resultant entities for the facet. */
        const newEntities = entitiesByFacet.get(facet);
        /* Grab the key-value pair selected term and operator for the facet. */
        const operatorBySelectedTerms =
          operatorBySelectedTermsByFacetRef.current.get(facet);

        /* Build the terms object. */
        const newTerms = [];
        /* For each term calculate the corresponding term count. */
        for (const term of setOfTerms) {
          /* Grab whether the term is selected. */
          const selected = operatorBySelectedTerms.has(term);
          /* Define the logical operator. */
          let logicalOperator;
          if (selected) {
            logicalOperator = operatorBySelectedTerms.get(term);
          }
          /* Grab the term count. */
          const [count, countless] =
            DashboardSearchService.getDashboardTermCount(
              facet,
              term,
              newEntities
            );

          /* Grab the term group. */
          const termGroup =
            termGroupsByTermByFacet.get(facet)?.get(term) || facet;

          // Add the term to the terms object if
          // there is a count,
          // or it is selected
          if (count || selected) {
            newTerms.push({
              count: count,
              countless,
              logicalOperator,
              name: term,
              termGroup: termGroup,
              selected: selected,
            });
          }
        }

        /* Grab the set of term groups for the facet. */
        const setOfTermGroups = new Set(
          termGroupsByFacet.get(facet) || [facet]
        );

        /* Split terms into term groups. */
        const termGroups = [...setOfTermGroups].map((termGroup) => {
          return {
            label: termGroup,
            terms: newTerms.filter(
              (newTerm) => newTerm.termGroup === termGroup
            ),
          };
        });

        /* Push the facet to the facets object. */
        newFacets.push({ name: facet, termGroups: termGroups });
      }

      return newFacets;
    },
    [setOfTermsByFacet]
  );

  /**
   * Returns the index query string for the specified facet and selected terms.
   * @type {function(*, *): string}
   */
  const buildQueryString = useCallback(
    (facet, operatorBySelectedTerms) => {
      /* Map through the selected term operators and build one query string. */
      return (
        [...operatorBySelectedTerms]
          /* Each facet will return its own query. */
          .map(([selectedTerm, operator]) => {
            const termPresence = lunrSearchPrefix[operator];
            /* Build the facet "search" query. */
            /* The "search" query is joined by "AND". */
            if (facet === "search") {
              /* Special handling of <input/> where text values might include characters like "+" or "~". */
              /* Prevents lunr errors when searching the index. */
              const regChars = /[^a-zA-Z0-9\s]/g; // Special characters
              const regWS = /\s\s+/g; // White space
              const term = selectedTerm
                .toLowerCase()
                .replace(regChars, "_")
                .replace(regWS, " ")
                .trim();

              return `${termPresence}${term}*`;
            }
            /* Build non "search" facet query. */
            /* These facets are joined by a logical operator. */
            /* Some terms may have special characters like "_" or "-". */
            /* To get an exact match we convert the selected term to a searchable value. */
            const termSearchValue =
              termSearchValueByTermDisplay.get(selectedTerm);
            const term = termSearchValue || selectedTerm;
            return `${termPresence}${facet}: ${term}`;
          })
          .join(" ")
      );
    },
    [termSearchValueByTermDisplay]
  );

  /**
   * Returns the summary.
   * @type {function(*=, *): *}
   */
  const buildSummaries = useCallback(
    (newEntities, newFacets) => {
      /* Grab the map key-value pair selected term and operator for the summary key. */
      const operatorBySelectedTerms =
        operatorBySelectedTermsByFacetRef.current.get(summaryKey);
      /* Determine whether the summary facet is unselected. */
      const facetUnselected = operatorBySelectedTerms.size === 0;

      /* Grab the set of summary terms. */
      // From the facets, find the summary facet,
      // then filter the terms either returning
      // all if they are all unselected or,
      // return only the selected terms,
      // then filter only the terms with a count,
      // then grab the result term name.
      const setOfSummaryTerms = new Set(
        newFacets
          .find((facet) => facet.name === summaryKey)
          .termGroups.reduce((accum, termGroup) => {
            const terms = termGroup.terms
              .filter((term) => facetUnselected || term.selected)
              .filter((term) => term.count)
              .map((term) => term.name);
            accum.push(...terms);
            return accum;
          }, [])
      );

      /* Return the summaries. */
      return DashboardSummaryService.getDashboardSummary(
        newEntities,
        summaryKey,
        tableHeadersSummary,
        setOfSummaryTerms
      );
    },
    [summaryKey, tableHeadersSummary]
  );

  /**
   * Returns the rows filtered from the results.
   * @type {function(*=): *}
   */
  const getEntities = useCallback(
    (setOfResults) => {
      /* Build the entities. */
      const newEntities = [];

      /* Push any row data with a "hit" in the set of results. */
      for (const result of [...setOfResults]) {
        const row = rowsByRowKey.get(result);
        newEntities.push(row);
      }

      return newEntities;
    },
    [rowsByRowKey]
  );

  /**
   * Fetches the lunr dashboard index.
   * @type {(function(): void)|*}
   */
  const fetchDashboardIndex = useCallback(() => {
    fetch(dashboardIndexFileName)
      .then((res) => res.json())
      .then((data) => {
        const index = lunr.Index.load(data);
        setDashboardIndex((dashboardIndex) => ({
          ...dashboardIndex,
          index: index,
          indexMounted: true,
        }));
      })
      .catch((err) => {
        console.log(err, "Error loading index");
      });
  }, [dashboardIndexFileName]);

  /**
   * Returns the intersecting sets of results.
   * Represents an "AND" join between facets.
   * @param setOfResultsByFacet
   * @returns {Set<T>}
   */
  const findIntersectionSetOfResults = useCallback(
    (setOfResultsByFacet) => {
      /* Early exit, return a full set of results. */
      /* No terms are selected. */
      if (setOfResultsByFacet.size === 0) {
        return setOfEntities;
      }

      /* Sort the set of results by set size. */
      const sortedSetsOfResults = sortSetsOfResults(setOfResultsByFacet);

      /* Grab the first set. */
      const firstSetOfResults = sortedSetsOfResults.shift();

      /* Find any intersecting sets of results. i.e. searching will be "AND" between facets. */
      /* Create a new set of intersection results. */
      /* i.e. filter through the smallest set to confirm results exist in all other search group sets. */
      return new Set(
        [...firstSetOfResults].filter((result) =>
          sortedSetsOfResults.every((setOfResults) => setOfResults.has(result))
        )
      );
    },
    [setOfEntities]
  );

  /**
   * Returns a map object key-value pair of facet and entities.
   * @type {function(*): Map<any, any>}
   */
  const getEntitiesByFacet = useCallback(
    (setOfResultsByFacet) => {
      /* Build entities by facet. */
      const entitiesByFacet = new Map();

      /* Loop through each facet and grab the resultant entities for that facet. */
      for (const facet of setOfTermsByFacet.keys()) {
        /* Clone the setOfResultsByFacet. */
        const setOfResultsByFacetClone = new Map(setOfResultsByFacet);

        /* Remove the facet from the setOfResultsByFacetClone */
        /* We are only interested in the intersection of results between the other facets/input. */
        /* Only do this for facets that are not "TOGGLE" select. */
        if (FacetSelectionControl[facet] !== SelectionControl.TOGGLE) {
          setOfResultsByFacetClone.delete(facet);
        }

        /* Get the intersection of results. */
        const setOfResults = findIntersectionSetOfResults(
          setOfResultsByFacetClone
        );

        /* Grab the entities and set the entities for the facet. */
        const newEntities = getEntities(setOfResults);
        entitiesByFacet.set(facet, newEntities);
      }

      return entitiesByFacet;
    },
    [findIntersectionSetOfResults, getEntities, setOfTermsByFacet]
  );

  /**
   * Returns the results from querying the index.
   * @type {function(*): Set<any>}
   */
  const getIndexResults = useCallback(
    /* Query the index and return the results key value. */
    (query) => {
      const queryString = `${query}`;
      const results = index.search(queryString);

      return results.map((result) => result.ref);
    },
    [index]
  );

  /**
   * Returns map object key-value pair of facet and selected term operator tuple.
   * Used by the dashboard control bar (facet de-selector and clear all tool).
   * @returns {Map<any, any>}
   */
  const getSelectedTermOperatorsByFacet = () => {
    /* Build selectedTermOperatorsByFacet map object with key-value pair selected facet and selectedTerm operator tuple. */
    const selectedTermOperatorsByFacet = new Map();
    /* Loop through each facet. */
    /* Set the facet with a list of selected term operator tuples. */
    for (const [
      facet,
      operatorBySelectedTerms,
    ] of operatorBySelectedTermsByFacetRef.current) {
      /* Only add facets with selected terms. */
      if (operatorBySelectedTerms.size > 0) {
        selectedTermOperatorsByFacet.set(facet, [...operatorBySelectedTerms]);
      }
    }

    return selectedTermOperatorsByFacet;
  };

  /**
   * Returns a map key-value pair of facet and set of results.
   * @type {function(): Map<any, any>}
   */
  const getSetOfResultsByFacet = useCallback(() => {
    /* Grab the current map key-value pair of selected term and operator by facet. */
    /* One of the event handlers e.g. onHandleUpdateFacet will have updated this map object. */
    const operatorBySelectedTermsByFacet =
      operatorBySelectedTermsByFacetRef.current;
    /* Grab the last facet hit. */
    /* We generally only want to update the most recently queried facet. */
    const lastFacetHit = lastHitRef.current.facet;
    /* Grab the current set of results by facet. */
    /* This will be updated now that the current set of selected terms has changed. */
    const setOfResultsByFacet = setOfResultsByFacetRef.current;

    /* Loop through the facets with selected terms and update the set of results for that facet. */
    // We are actually only interested in the facet most recently "hit", and updating its set of results.
    // The caveat is when multiple facets have been "cleared" e.g. when "Clear All" has been selected
    // or when the component has mounted with a predefined query (from a shared link).
    // Facets with unselected terms return a full set of results i.e. setOfEntities.
    for (const [
      facet,
      operatorBySelectedTerms,
    ] of operatorBySelectedTermsByFacet.entries()) {
      /* Get the set of results for the facet. */
      // We will query the index when
      // the component has mounted,
      // the facet's set of terms has been updated (last hit),
      // or all facets have been cleared.
      if (!lastFacetHit || lastFacetHit === facet) {
        /* Early exit - continue. */
        /* There is no need to re-query the index if the facet has no selected terms. */
        /* The facet's set of results will be the entire set of entities. */
        if (operatorBySelectedTerms.size === 0) {
          setOfResultsByFacet.set(facet, setOfEntities);
          continue;
        }

        /* Build the query string, query the index, and set the setOfResults to the facet. */
        const queryString = buildQueryString(facet, operatorBySelectedTerms);
        const results = getIndexResults(queryString);
        setOfResultsByFacet.set(facet, new Set(results));
      }
    }

    return setOfResultsByFacet;
  }, [buildQueryString, getIndexResults, setOfEntities]);

  /**
   * Returns the url search params.
   * @returns {URLSearchParams}
   */
  const getURLSearchParams = useCallback(() => {
    /* Grab and return the search params. */
    const currentQuery = getCurrentQuery();
    return new URLSearchParams(currentQuery);
  }, [getCurrentQuery]);

  /**
   * Init inputValue.
   * inputValue, when deviated from the <input/> value will update the text input.
   * This typically occurs when the component mounts (and the url has a query) or
   * when the "search" facet has been cleared
   * or one of the terms has been deselected.
   * @type {(function(): void)|*}
   */
  const initInputValue = useCallback(() => {
    /* Grab the selected terms for the facet "search". */
    const selectedTerms = Array.from(
      operatorBySelectedTermsByFacetRef.current.get("search").keys()
    );
    /* Convert the terms to a (string) list of terms. */
    inputValueRef.current =
      selectedTerms.length > 0 ? selectedTerms.join(" ") : "";
  }, []);

  /**
   * Init state query and execute tracking.
   * @type {(function(): void)|*}
   */
  const initQuery = useCallback(() => {
    updateQueryAndExecuteTracking();
  }, [updateQueryAndExecuteTracking]);

  /**
   * Init searchURL with the window's current location.
   * @type {(function(): void)|*}
   */
  const initSearchURL = useCallback(() => {
    searchURLRef.current = dashboardURL;
  }, [dashboardURL]);

  /**
   * Init setOfResultsByFacet.
   * @type {(function(): void)|*}
   */
  const initSetOfResultsByFacet = useCallback(() => {
    /* For each facet, init with a complete set of results (entities). */
    for (const facet of setOfTermsByFacet.keys()) {
      setOfResultsByFacetRef.current.set(facet, setOfEntities);
    }
  }, [setOfEntities, setOfTermsByFacet]);

  /**
   * Init operatorBySelectedTermsByFacet.
   * Updates when component mounts with query string in the url.
   * @type {(function(): void)|*}
   */
  const initOperatorBySelectedTermsByFacet = useCallback(() => {
    /* Get the search params. */
    const urlSearchParams = getURLSearchParams();

    /* For each facet, init the set of selected terms. */
    for (const facet of setOfTermsByFacet.keys()) {
      /* From the search params, for the facet, grab the param value. */
      const paramValue = urlSearchParams.get(facet);
      /* Split the param value into an array of params [term,operator,term,...]. */
      const params = paramValue?.split(",");

      /* Build a map of selected terms and corresponding logical operator. */
      const operatorBySelectedTerms = new Map();

      /* Add any selected terms to the set. */
      params?.forEach((param, i, array) => {
        /* The even index is the term, the subsequent index is the corresponding operator. */
        if (i % 2 === 0) {
          operatorBySelectedTerms.set(param, array[i + 1]);
        }
      });

      /* Update the ref. */
      operatorBySelectedTermsByFacetRef.current.set(
        facet,
        operatorBySelectedTerms
      );
    }
  }, [getURLSearchParams, setOfTermsByFacet]);

  /**
   * Returns true if no action is required.
   * True when there is no change to the facet "search" term.
   * @returns {boolean}
   * @param facet
   * @param term
   */
  const isNoActionRequired = (facet, term) => {
    /* If the facet is "search" check for no changes since last entry. */
    if (facet === "search") {
      /* Grab the selected terms for the "search" facet. */
      const selectedTerms = operatorBySelectedTermsByFacetRef.current
        .get(facet)
        .keys();
      /* Compare the new term with the current term. */
      const currentTerm = [...selectedTerms].join(" ");
      return term === currentTerm;
    }

    return false;
  };

  /**
   * Clears all selected terms.
   */
  const onHandleClearAll = () => {
    /* Update the current ref lastHit. */
    lastHitRef.current = {
      facet: "",
      logicalOperator: undefined,
      selected: false,
      term: "",
    };

    /* Update the current ref operatorBySelectedTermsByFacet. */
    /* For each facet clear the selected terms. */
    for (const facet of operatorBySelectedTermsByFacetRef.current.keys()) {
      operatorBySelectedTermsByFacetRef.current.set(facet, new Map());
    }

    /* Update search <input/> uncontrolled value. */
    updateInputValueRef("search");

    /* Update query, dashboard url and execute tracking. */
    updateQueryAndExecuteTracking();
  };

  /**
   * Clears all selected terms for the specified facet.
   * @param facet
   */
  const onHandleClearFacet = (facet) => {
    /* Update the current ref lastHit. */
    lastHitRef.current = {
      facet: facet,
      logicalOperator: undefined,
      selected: false,
      term: "",
    };

    /* Update the current ref operatorBySelectedTermsByFacet. */
    /* For the specified facet clear the selected term operator tuples. */
    operatorBySelectedTermsByFacetRef.current.set(facet, new Map());

    /* Update search <input/> uncontrolled value. */
    updateInputValueRef(facet);

    /* Update query, dashboard url and execute tracking. */
    updateQueryAndExecuteTracking();
  };

  /**
   * Clears the specified term.
   * @param facet
   * @param logicalOperator
   * @param term
   */
  const onHandleClearTerm = (facet, logicalOperator, term) => {
    /* Update the current ref lastHit. */
    lastHitRef.current = {
      facet: facet,
      logicalOperator: logicalOperator,
      selected: false,
      term: term,
    };

    /* Update the current ref operatorBySelectedTermsByFacet. */
    /* Get the map key-value pair selected terms and operator for the facet. */
    const operatorBySelectedTerms =
      operatorBySelectedTermsByFacetRef.current.get(facet);
    /* Remove the term. */
    operatorBySelectedTerms.delete(term);

    /* Update search <input/> uncontrolled value. */
    updateInputValueRef(facet, term);

    /* Update query, dashboard url and execute tracking. */
    updateQueryAndExecuteTracking();
  };

  /**
   * Updates the selected terms.
   * @param event
   */
  const onHandleUpdateFacet = (event) => {
    /* Grab the facet, term and selected values. */
    const { facet, logicalOperator, selected, term } = event;

    /* Strip out any unnecessary white space; typically used by "search" facet. */
    const newTerm = term.replace(regWhiteSpace, " ").trim();

    /* Early exit, no action required. */
    /* Used if the "search" facet term has not changed. */
    if (isNoActionRequired(facet, newTerm)) {
      return;
    }

    /* Update the current ref lastHit. */
    lastHitRef.current = {
      facet,
      logicalOperator,
      selected,
      term: newTerm,
    };

    /* Grab the current operatorBySelectedTerms for the specified facet. */
    const operatorBySelectedTerms =
      operatorBySelectedTermsByFacetRef.current.get(facet);

    /* Update all terms for the search facet. */
    if (facet === "search") {
      /* Clear any previously selected terms. */
      operatorBySelectedTerms.clear();

      /* Update search <input/> uncontrolled value. */
      inputValueRef.current = term;

      /* Only add non empty terms. */
      if (newTerm) {
        const newTerms = newTerm.split(" ");
        /* Add the new selected terms. */
        newTerms.forEach((nTerm) =>
          operatorBySelectedTerms.set(nTerm, logicalOperator)
        );
      }
    } else {
      /* Update the term for the specified facet. */
      if (selected) {
        /* Add the term if selected. */
        operatorBySelectedTerms.set(term, logicalOperator);
      } else {
        /* Remove the term if de-selected. */
        operatorBySelectedTerms.delete(term);
      }
    }

    /* Update query, dashboard url and execute tracking. */
    updateQueryAndExecuteTracking();
  };

  /**
   * Returns a list of the setOfResults sorted by set size.
   *
   * @param setOfResultsByFacet
   * @returns {*[]}
   */
  const sortSetsOfResults = (setOfResultsByFacet) => {
    return [...setOfResultsByFacet.values()].sort(function (set0, set1) {
      if (set0.size > set1.size) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  /**
   * Updates the ref inputValue.
   * Executed with onHandleClearTerm, onHandleClearFacet or onHandleClearAll.
   * @param facet
   * @param term
   */
  const updateInputValueRef = (facet, term = "") => {
    if (facet === "search") {
      /* Update the ref inputValue. */
      if (term) {
        // Any external changes to the facet "search" selected terms via one of the events
        // e.g. onHandleClearTerm will need to be reflected in the uncontrolled <input/>.
        // Using replace and regex we are able to "strip" out the term of interest from
        // the ref inputValue, which in turn will update the <input/> with the new value.
        const currentInputValue = inputValueRef.current;
        inputValueRef.current = currentInputValue
          .replace(term, "")
          .replace(regWhiteSpace, " ")
          .trim();
      } else {
        inputValueRef.current = "";
      }
    }
  };

  /**
   * Generates the results.
   * Returns the entities, the facets (with counts), and the summary.
   * @type {function(): [*, *[], *]}
   */
  const generateResults = useCallback(() => {
    /* Generate results. */
    /* Get the set of results by facet. */
    const setOfResultsByFacet = getSetOfResultsByFacet();

    /* Clone the setOfResultsByFacet and remove any facets with unselected terms. */
    const setOfResultsByFacetClone = new Map(setOfResultsByFacet);
    for (const facet of setOfTermsByFacet.keys()) {
      if (operatorBySelectedTermsByFacetRef.current.get(facet).size === 0) {
        setOfResultsByFacetClone.delete(facet);
      }
    }

    /* Get the intersecting set of results. */
    const setOfResults = findIntersectionSetOfResults(setOfResultsByFacetClone);

    /* Get the resultant entities. */
    const newEntities = getEntities(setOfResults);

    /* Get the entities by facet. */
    /* Used to calculate term counts. */
    const entitiesByFacet = getEntitiesByFacet(setOfResultsByFacetClone);

    /* Build the facets. */
    const newFacets = buildFacets(entitiesByFacet);

    /* Build the summaries. */
    const newSummaries = buildSummaries(newEntities, newFacets);

    /* Update ref for setOfResultsByFacet. */
    /* Now that the results are complete, update the set of results by facet ref value. */
    setOfResultsByFacetRef.current = setOfResultsByFacet;

    return [newEntities, newFacets, newSummaries];
  }, [
    buildFacets,
    buildSummaries,
    findIntersectionSetOfResults,
    getEntities,
    getEntitiesByFacet,
    getSetOfResultsByFacet,
    setOfTermsByFacet,
  ]);

  /**
   * useEffect - componentDidMount/componentWillUnmount.
   * Fetch index.
   */
  useEffect(() => {
    /* Grab the index. */
    fetchDashboardIndex();
    return () => {
      setDashboardIndex({ index: {}, indexMounted: false });
    };
  }, [fetchDashboardIndex]);

  /**
   * useEffect - componentDidUpdate - indexMounted.
   */
  useEffect(() => {
    if (indexMounted) {
      /* Initialize the state "searchURL". */
      initSearchURL();

      /* Init the ref operatorBySelectedTermsByFacetRef. */
      initOperatorBySelectedTermsByFacet();

      /* Init ref inputValue. */
      initInputValue();

      /* Init the ref setOfResultsByFacetRef. */
      initSetOfResultsByFacet();

      /* Init state query. */
      initQuery();
    }
  }, [
    indexMounted,
    initQuery,
    initInputValue,
    initSearchURL,
    initSetOfResultsByFacet,
    initOperatorBySelectedTermsByFacet,
  ]);

  /**
   * useEffect - componentDidUpdate - query, indexMounted.
   */
  useEffect(() => {
    /* Executes only when index is mounted. */
    if (indexMounted) {
      /* Generate results. */
      const [newEntities, newFacets, newSummaries] = generateResults();

      /* Set state results. */
      setResults((results) => ({
        ...results,
        entities: newEntities,
        facets: newFacets,
        summaries: newSummaries,
      }));
    }
  }, [generateResults, indexMounted, query]);

  return (
    <ContextDashboard.Provider
      value={{
        entities,
        facets,
        inputValue: inputValueRef.current,
        onHandleClearAll,
        onHandleClearFacet,
        onHandleClearTerm,
        onHandleUpdateFacet,
        panelCount,
        results,
        selectedTermOperatorsByFacet: selectedTermOperatorsByFacetRef.current,
        searchURL: searchURLRef.current,
        setOfSummaryKeyTerms,
        summaries,
        tableHeadersEntities,
        tableHeadersSummary,
        warning,
      }}
    >
      {children}
    </ContextDashboard.Provider>
  );
}

export default ProviderDashboard;

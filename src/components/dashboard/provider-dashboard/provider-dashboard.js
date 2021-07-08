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
import * as AnvilGTMService from "../../../utils/anvil-gtm/anvil-gtm.service";
import { GAEntityType } from "../../../utils/anvil-gtm/ga-entity-type.model";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";
import * as DashboardSummaryService from "../../../utils/dashboard/dashboard-summary.service";

function ProviderDashboard(props) {
  const {
    children,
    countLabel,
    dashboardEntities,
    dashboardIndexFileName,
    dashboardURL,
    resultKey,
    setOfEntities,
    setOfSummaryKeyTerms,
    setOfTermsByFacet,
    summaryKey,
    tableHeadersEntities,
    tableHeadersSummary,
    termSearchValueByTermDisplay,
    totalsWarning
  } = props;
  const inputValueRef = useRef("");
  const lastHitRef = useRef({ facet: "", selected: false, term: "" });
  const searchURLRef = useRef(null);
  const selectedTermsByFacetRef = useRef(new Map());
  const setOfResultsByFacetRef = useRef(new Map());
  const setOfSelectedTermsByFacetRef = useRef(new Map());
  const [dashboardIndex, setDashboardIndex] = useState({
    index: {},
    indexMounted: false
  });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    entities: [],
    facets: [],
    summaries: []
  });
  const { index, indexMounted } = dashboardIndex;
  const { entities, facets, summaries } = results;
  const regSpecialChars = /[^a-zA-Z0-9\s]/g;
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
  const updateDashboardURL = useCallback(
    currentQuery => {
      /* Create new url from the existing dashboard url. */
      const url = new URL(dashboardURL);

      /* Add or remove search params from the url. */
      /* If there is a current query set the search params to the url. */
      if (currentQuery) {
        /* Set the search params. */
        url.searchParams.set("query", currentQuery);
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
    },
    [dashboardURL]
  );

  /**
   * Updates state query, search and dashboard url, and executes tracking.
   * @type {(function(): void)|*}
   */
  const updateQueryAndExecuteTracking = useCallback(() => {
    /* Grab the current selectedTermsByFacet. */
    const selectedTermsByFacet = getSelectedTermsByFacet();

    /* Update the ref selectedTermsByFacet. */
    selectedTermsByFacetRef.current = selectedTermsByFacet;

    /* Convert selected terms to valid query string object. */
    const newQuery = new URLSearchParams(selectedTermsByFacet).toString();

    /* Grab the current query. */
    const currentQuery = getCurrentQuery();

    /* Update dashboard url and ref SearchURL. */
    updateDashboardURL(newQuery);

    /* Grab the last hit values. */
    const { facet, selected, term } = lastHitRef.current;

    /** Execute tracking for facet "search". */
    if (facet === "search") {
      AnvilGTMService.trackSearchInput(
        term,
        newQuery,
        currentQuery,
        GAEntityType.WORKSPACE
      );
    } else {
      /* Execute tracking for all other facets. */
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
    entitiesByFacet => {
      /* Build the facets object. */
      const _facets = [];

      /* Loop through each facet and the corresponding set of terms. */
      for (const [facet, setOfTerms] of setOfTermsByFacet) {
        /* Exclude the "search" facet as it is not part of the checkbox group. */
        if (facet === "search") {
          continue;
        }

        /* Grab the resultant entities for the facet. */
        const _entities = entitiesByFacet.get(facet);
        /* Grab the set of selected terms for the facet. */
        const setOfSelectedTermsByFacet = setOfSelectedTermsByFacetRef.current;
        const setOfSelectedTerms = setOfSelectedTermsByFacet.get(facet);

        /* Build the terms object. */
        const _terms = [];
        /* For each term calculate the corresponding term count. */
        for (const term of setOfTerms) {
          /* Grab whether the term is selected. */
          const selected = setOfSelectedTerms.has(term);
          /* Grab the term count. */
          const count = DashboardSearchService.getDashboardTermCount(
            facet,
            term,
            _entities
          );

          // Add the term to the terms object if
          // there is a count,
          // or it is selected
          if (count || selected) {
            _terms.push({ name: term, count: count, selected: selected });
          }
        }

        // Push the facet to the facets object. */
        _facets.push({ name: facet, terms: _terms });
      }

      return _facets;
    },
    [setOfTermsByFacet]
  );

  /**
   * Returns the index query string for the specified facet and selected terms.
   * @param facet
   * @param setOfSelectedTerms
   * @returns {string}
   */
  const buildQueryString = useCallback(
    (facet, setOfSelectedTerms) => {
      /* Map through the selected terms and build one query string. */
      return (
        [...setOfSelectedTerms]
          /* Each facet will return its own query. */
          .map(selectedTerm => {
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

              return `+${term}*`;
            }
            /* Build non "search" facet query. */
            /* These facets are joined by "OR". */
            /* Some terms may have special characters like "_" or "-". */
            /* To get an exact match we convert the selected term to a searchable value. */
            const termSearchValue = termSearchValueByTermDisplay.get(
              selectedTerm
            );
            const term = termSearchValue || selectedTerm;
            return `${facet}: ${term}`;
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
    (_entities, _facets) => {
      /* Grab the set of selected terms for the summary key. */
      const setOfSelectedTermsByFacet = setOfSelectedTermsByFacetRef.current;
      const setOfSelectedTerms = setOfSelectedTermsByFacet.get(summaryKey);
      /* Determine whether the summary facet is unselected. */
      const facetUnselected = setOfSelectedTerms.size === 0;

      /* Grab the set of summary terms. */
      // From the facets, find the summary facet,
      // then filter the terms either returning
      // all if they are all unselected or,
      // return only the selected terms,
      // then filter only the terms with a count,
      // then grab the result term name.
      const setOfSummaryTerms = new Set(
        _facets
          .find(facet => facet.name === summaryKey)
          .terms.filter(term => facetUnselected || term.selected)
          .filter(term => term.count)
          .map(term => term.name)
      );

      /* Return the summaries. */
      return DashboardSummaryService.getDashboardSummary(
        _entities,
        summaryKey,
        tableHeadersSummary,
        setOfSummaryTerms
      );
    },
    [summaryKey, tableHeadersSummary]
  );

  /**
   * Fetches the lunr dashboard index.
   * @type {(function(): void)|*}
   */
  const fetchDashboardIndex = useCallback(() => {
    fetch(dashboardIndexFileName)
      .then(res => res.json())
      .then(data => {
        const index = lunr.Index.load(data);
        setDashboardIndex(dashboardIndex => ({
          ...dashboardIndex,
          index: index,
          indexMounted: true
        }));
      })
      .catch(err => {
        console.log(err, "Error loading index");
      });
  }, [dashboardIndexFileName]);

  /**
   * Returns the entities filtered from the results.
   * @type {function(*=): *}
   */
  const filterEntities = useCallback(
    setOfResults => {
      /* Early exit - set of results is empty. */
      if (setOfResults.size === 0) {
        return [];
      }

      return dashboardEntities.filter(entity =>
        setOfResults.has(entity[resultKey])
      );
    },
    [dashboardEntities, resultKey]
  );

  /**
   * Returns the intersecting sets of results.
   * Represents an "AND" join between facets.
   * @param setOfResultsByFacet
   * @returns {Set<T>}
   */
  const findIntersectionSetOfResults = useCallback(setOfResultsByFacet => {
    /* Sort the set of results by set size. */
    const sortedSetsOfResults = sortSetsOfResults(setOfResultsByFacet);

    /* Grab the first set. */
    const firstSetOfResults = sortedSetsOfResults.shift();

    /* Find any intersecting sets of results. i.e. searching will be "AND" between facets. */
    /* Create a new set of intersection results. */
    /* i.e. filter through the smallest set to confirm results exist in all other search group sets. */
    return new Set(
      [...firstSetOfResults].filter(result =>
        sortedSetsOfResults.every(setOfResults => setOfResults.has(result))
      )
    );
  }, []);

  /**
   * Returns a map object key-value pair of facet and entities.
   * @type {function(*): Map<any, any>}
   */
  const getEntitiesByFacet = useCallback(
    setOfResultsByFacet => {
      /* Grab the facets. */
      const facets = setOfTermsByFacet.keys();
      const entitiesByFacet = new Map();

      /* Loop through each facet and grab the resultant entities for that facet. */
      for (const facet of facets) {
        /* Clone the setOfResultsByFacet. */
        const setOfResultsByFacetClone = new Map(setOfResultsByFacet);

        /* Remove the facet from the setOfResultsByFacetClone */
        /* We are only interested in the intersection of results between the other facets/input. */
        setOfResultsByFacetClone.delete(facet);

        /* Get the intersection of results. */
        const setOfResults = findIntersectionSetOfResults(
          setOfResultsByFacetClone
        );

        /* Grab the entities and set the entities for the facet. */
        const _entities = filterEntities(setOfResults);
        entitiesByFacet.set(facet, _entities);
      }

      return entitiesByFacet;
    },
    [filterEntities, findIntersectionSetOfResults, setOfTermsByFacet]
  );

  /**
   * Returns the results from querying the index.
   * @type {function(*): Set<any>}
   */
  const getIndexResults = useCallback(
    /* Query the index and return the results key value. */
    query => {
      const queryString = `${query}`;
      const results = index.search(queryString);

      return results.map(result => result.ref);
    },
    [index]
  );

  /**
   * Returns map object key-value pair of facet and selected terms.
   * Used by the dashboard control bar (facet de-selector and clear all tool).
   * @returns {Map<any, any>}
   */
  const getSelectedTermsByFacet = () => {
    /* Grab the ref setOfSelectedTermsByFacet. */
    const setOfSelectedTermsByFacet = setOfSelectedTermsByFacetRef.current;

    /* Build selectedTermsByFacet map object with key-value pair facet and selectedTerms. */
    const selectedTermsByFacet = new Map();
    /* Loop through each facet and corresponding set of selected terms. */
    /* Set the facet with a list of selected terms. */
    for (const [facet, setOfSelectedTerms] of setOfSelectedTermsByFacet) {
      /* Only add facets with selected terms. */
      if (setOfSelectedTerms.size > 0) {
        selectedTermsByFacet.set(facet, [...setOfSelectedTerms]);
      }
    }

    return selectedTermsByFacet;
  };

  /**
   * Returns a map key-value pair of facet and set of results.
   * @type {function(): Map<any, any>}
   */
  const getSetOfResultsByFacet = useCallback(() => {
    /* Grab the current set of selected terms by facet. */
    /* One of the event handlers e.g. onHandleUpdateFacet will have updated this map object. */
    const setOfSelectedTermsByFacet = setOfSelectedTermsByFacetRef.current;
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
      setOfSelectedTerms
    ] of setOfSelectedTermsByFacet.entries()) {
      /* Get the set of results for the facet. */
      // We will query the index when
      // the component has mounted,
      // the facet's set of terms has been updated (last hit),
      // or all facets have been cleared.
      if (!lastFacetHit || lastFacetHit === facet) {
        /* Early exit - continue. */
        /* There is no need to re-query the index if the facet has no selected terms. */
        /* The facet's set of results will be the entire set of entities. */
        if (setOfSelectedTerms.size === 0) {
          setOfResultsByFacet.set(facet, setOfEntities);
          continue;
        }

        /* Build the query string, query the index, and set the setOfResults to the facet. */
        const queryString = buildQueryString(facet, setOfSelectedTerms);
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
    /* Grab the set of selected terms for the facet "search". */
    const setOfSelectedTermsByFacet = setOfSelectedTermsByFacetRef.current;
    const setOfSelectedTerms = setOfSelectedTermsByFacet.get("search");
    const terms = [...setOfSelectedTerms];
    /* Convert the terms to a (string) list of terms. */
    const termsStr = terms ? terms.join(" ") : "";
    inputValueRef.current = termsStr;
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
   * Init setOfSelectedTermsByFacet.
   * Update the set of selected terms should the component mount with query string in the url.
   * @type {(function(): void)|*}
   */
  const initSetOfSelectedTermsByFacet = useCallback(() => {
    /* Get the search params. */
    const urlSearchParams = getURLSearchParams();
    /* Grab the facets. */
    const facets = setOfTermsByFacet.keys();

    /* For each facet, init the set of selected terms. */
    for (const facet of facets) {
      /* From the search params, for the facet, grab the term list. */
      const termList = urlSearchParams.get(facet);
      /* Split the term list into an array of terms. */
      const terms = termList?.split(",");

      /* Build a set of selected terms. */
      const setOfSelectedTerms = new Set();

      /* Add any selected terms to the set. */
      if (terms) {
        terms.forEach(term => setOfSelectedTerms.add(term));
      }

      /* Update the ref. */
      setOfSelectedTermsByFacetRef.current.set(facet, setOfSelectedTerms);
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
      /* Get the current ref setOfSelectedTermsByFacet. */
      const setOfSelectedTermsByFacet = setOfSelectedTermsByFacetRef.current;
      /* Grab the selected terms for the "search" facet. */
      const setOfSelectedTerms = setOfSelectedTermsByFacet.get(facet);
      /* Compare the new term with the current term. */
      const currentTerm = [...setOfSelectedTerms].join(" ");
      return term === currentTerm;
    }

    return false;
  };

  /**
   * Clears all selected terms.
   */
  const onHandleClearAll = () => {
    /* Update the current ref lastHit. */
    lastHitRef.current = { facet: "", selected: false, term: "" };

    /* Update the current ref setOfSelectedTermsByFacet. */
    const setOfSelectedTermsByFacet = setOfSelectedTermsByFacetRef.current;
    const facets = setOfSelectedTermsByFacet.keys();
    /* For each facet clear the set of selected terms. */
    for (const facet of facets) {
      setOfSelectedTermsByFacetRef.current.set(facet, new Set());
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
  const onHandleClearFacet = facet => {
    /* Update the current ref lastHit. */
    lastHitRef.current = { facet: facet, selected: false, term: "" };

    /* Update the current ref setOfSelectedTermsByFacet. */
    /* For the specified facet clear the set of selected terms. */
    setOfSelectedTermsByFacetRef.current.set(facet, new Set());

    /* Update search <input/> uncontrolled value. */
    updateInputValueRef(facet);

    /* Update query, dashboard url and execute tracking. */
    updateQueryAndExecuteTracking();
  };

  /**
   * Clears the specified term.
   * @param facet
   * @param term
   */
  const onHandleClearTerm = (facet, term) => {
    /* Update the current ref lastHit. */
    lastHitRef.current = { facet: facet, selected: false, term: term };

    /* Update the current ref setOfSelectedTermsByFacet. */
    /* Get the set of selected terms for the facet. */
    const setOfSelectedTerms = setOfSelectedTermsByFacetRef.current.get(facet);
    /* Remove the term from the set. */
    setOfSelectedTerms.delete(term);
    /* Update the facet with the revised set of terms. */
    setOfSelectedTermsByFacetRef.current.set(facet, setOfSelectedTerms);

    /* Update search <input/> uncontrolled value. */
    updateInputValueRef(facet, term);

    /* Update query, dashboard url and execute tracking. */
    updateQueryAndExecuteTracking();
  };

  /**
   * Updates the selected terms.
   * @param event
   */
  const onHandleUpdateFacet = event => {
    /* Grab the facet, term and selected values. */
    const { facet, selected, term } = event;

    /* Strip out any unnecessary white space; typically used by "search" facet. */
    const newTerm = term.replace(regWhiteSpace, " ").trim();

    /* Early exit, no action required. */
    /* Used if the "search" facet term has not changed. */
    if (isNoActionRequired(facet, newTerm)) {
      return;
    }

    /* Update the current ref lastHit. */
    lastHitRef.current = {
      facet: facet,
      selected: selected,
      term: newTerm
    };

    /* Grab the current setOfSelectedTerms for the specified facet. */
    const setOfSelectedTerms = setOfSelectedTermsByFacetRef.current.get(facet);

    /* Update all terms for the search facet. */
    if (facet === "search") {
      /* Clear any previously selected terms. */
      setOfSelectedTerms.clear();

      /* Update search <input/> uncontrolled value. */
      inputValueRef.current = term;

      /* Only add non empty terms. */
      if (newTerm) {
        const newTerms = newTerm.split(" ");
        /* Add the new selected terms to the set. */
        newTerms.forEach(nTerm => setOfSelectedTerms.add(nTerm));
      }
    } else {
      /* Update the term for the specified facet. */
      if (selected) {
        /* Add the term if selected. */
        setOfSelectedTerms.add(term);
      } else {
        /* Remove the term if de-selected. */
        setOfSelectedTerms.delete(term);
      }
    }

    /* Update the current ref setOfSelectedTermsByFacet. */
    setOfSelectedTermsByFacetRef.current.set(facet, setOfSelectedTerms);

    /* Update query, dashboard url and execute tracking. */
    updateQueryAndExecuteTracking();
  };

  /**
   * Returns a list of the setOfResults sorted by set size.
   *
   * @param setOfResultsByFacet
   * @returns {*[]}
   */
  const sortSetsOfResults = setOfResultsByFacet => {
    return [...setOfResultsByFacet.values()].sort(function(set0, set1) {
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
        const regWildCard = term.replace(regSpecialChars, ".?");
        const regExp = new RegExp(`(${regWildCard})`, "g");
        const currentInputValue = inputValueRef.current;
        inputValueRef.current = currentInputValue
          .replace(regExp, "")
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

    /* Get the intersecting set of results. */
    const setOfResults = findIntersectionSetOfResults(setOfResultsByFacet);

    /* Get the resultant entities. */
    const _entities = filterEntities(setOfResults);

    /* Get the entities by facet. */
    /* Used to calculate term counts. */
    const entitiesByFacet = getEntitiesByFacet(setOfResultsByFacet);

    /* Build the facets. */
    const _facets = buildFacets(entitiesByFacet);

    /* Build the summaries. */
    const _summaries = buildSummaries(_entities, _facets);

    /* Update ref for setOfResultsByFacet. */
    /* Now that the results are complete, update the set of results by facet ref value. */
    setOfResultsByFacetRef.current = setOfResultsByFacet;

    return [_entities, _facets, _summaries];
  }, [
    buildSummaries,
    filterEntities,
    findIntersectionSetOfResults,
    buildFacets,
    getEntitiesByFacet,
    getSetOfResultsByFacet
  ]);

  /**
   * useEffect - componentDidMount/componentWillUnmount.
   * Fetch index.
   */
  useEffect(() => {
    /* Grab the index. */
    fetchDashboardIndex();
  }, [fetchDashboardIndex]);

  /**
   * useEffect - componentDidUpdate - searchValue, indexMounted.
   * Update setOfResultsBySearchGroups when index is mounted or with change in searchValue.
   */
  useEffect(() => {
    if (indexMounted) {
      /* Initialize the state "searchURL". */
      initSearchURL();

      /* Init the ref setOfSelectedTermsByFacetRef. */
      initSetOfSelectedTermsByFacet();

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
    initSetOfSelectedTermsByFacet
  ]);

  /**
   * useEffect - componentDidUpdate - query, indexMounted.
   * Update setOfResultsBySearchGroups when index is mounted or with a change in query.
   */
  useEffect(() => {
    /* Executes only when index is mounted. */
    if (indexMounted) {
      /* Generate results. */
      const [_entities, _facets, _summaries] = generateResults();

      /* Set state results. */
      setResults(results => ({
        ...results,
        entities: _entities,
        facets: _facets,
        summaries: _summaries
      }));
    }
  }, [generateResults, indexMounted, query]);

  return (
    <ContextDashboard.Provider
      value={{
        countLabel,
        entities,
        facets,
        inputValue: inputValueRef.current,
        onHandleClearAll,
        onHandleClearFacet,
        onHandleClearTerm,
        onHandleUpdateFacet,
        results,
        selectedTermsByFacet: selectedTermsByFacetRef.current,
        searchURL: searchURLRef.current,
        setOfSummaryKeyTerms,
        summaries,
        tableHeadersEntities,
        tableHeadersSummary,
        warning
      }}
    >
      {children}
    </ContextDashboard.Provider>
  );
}

export default ProviderDashboard;

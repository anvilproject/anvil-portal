/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for sharing dashboard search query results.
 * Used to filter the dashboard dataset.
 */

// Core dependencies
import React from "react";

const ContextDashboard = React.createContext({
  countLabel: "",
  entities: [],
  facetSelectorFacets: [],
  inputValue: "",
  searchURL: "",
  selectedTermsByFacet: new Map(),
  setOfResults: new Set(),
  setOfSummaryKeyTerms: new Set(),
  summaries: [],
  tableHeadersEntities: [],
  tableHeadersSummary: [],
  termsChecked: new Map(),
  termsCount: new Map(),
  warning: null,
  onHandleChecked: () => {},
  onHandleClearFacet: () => {},
  onHandleClearInput: () => {},
  onHandleClearSearch: () => {},
  onHandleClearTerm: () => {},
  onHandleInput: () => {}
});

export default ContextDashboard;

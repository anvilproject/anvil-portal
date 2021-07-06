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
  facets: [],
  inputValue: "",
  searchURL: "",
  selectedTermsByFacet: new Map(),
  setOfSummaryKeyTerms: new Set(),
  summaries: [],
  tableHeadersEntities: [],
  tableHeadersSummary: [],
  warning: null,
  onHandleClearAll: () => {},
  onHandleClearFacet: () => {},
  onHandleClearTerm: () => {},
  onHandleUpdateFacet: () => {}
});

export default ContextDashboard;

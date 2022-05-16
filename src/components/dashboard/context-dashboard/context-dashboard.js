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
  entities: [],
  facets: [],
  inputValue: "",
  panelCount: 0,
  searchURL: "",
  selectedTermOperatorsByFacet: new Map(),
  summaries: [],
  tableHeadersEntities: [],
  tableHeadersSummary: [],
  warning: null,
  onHandleClearAll: () => {},
  onHandleClearFacet: () => {},
  onHandleClearTerm: () => {},
  onHandleUpdateFacet: () => {},
});

export default ContextDashboard;

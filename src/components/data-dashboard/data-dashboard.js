/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data dashboard component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboardFilter from "./context-dashboard-filter/context-dashboard-filter";
import * as DashboardSearchService from "../../utils/dashboard/dashboard-search.service";

class DataDashboard extends React.Component {

    componentDidMount() {

        /* Initialize dashboard. */
        this.initializeDashboard();
    }

    initializeDashboard = () => {

        const {dashboardEntities,
            dashboardIndexFileName,
            resultKey,
            searchFacets,
            summaryKey,
            tableHeadersEntities,
            tableHeadersSummary,
            onHandleInitializeDashboard} = this.props;

        const facetsByTerm = DashboardSearchService.getDashboardFacetsByTerm(dashboardEntities, searchFacets);
        const checkboxGroups = DashboardSearchService.buildDashboardCheckboxesByFacet(facetsByTerm, searchFacets);
        const setOfSearchGroups = DashboardSearchService.getDashboardSetOfSearchGroups(searchFacets);
        const setOfTerms = DashboardSearchService.getDashboardSetOfTerms(facetsByTerm);
        const termSearchValueByTermDisplay = DashboardSearchService.getDashboardTermSearchValueByTermDisplay(facetsByTerm);

        onHandleInitializeDashboard({
            checkboxGroups: checkboxGroups,
            dashboardEntities: dashboardEntities,
            dashboardIndexFileName: dashboardIndexFileName,
            facetsByTerm: facetsByTerm,
            resultKey: resultKey,
            setOfSearchGroups: setOfSearchGroups,
            setOfTerms: setOfTerms,
            summaryKey: summaryKey,
            termSearchValueByTermDisplay: termSearchValueByTermDisplay,
            tableHeadersEntities: tableHeadersEntities,
            tableHeadersSummary: tableHeadersSummary});
    };

    render() {
        const {children} = this.props;
        return (
            children
        )
    };
}

export default (props) => {

    /* Grab the dashboard function onHandleInitializeDashboard. */
    const {onHandleInitializeDashboard} = useContext(ContextDashboardFilter);

    return (
        <DataDashboard onHandleInitializeDashboard={onHandleInitializeDashboard} {...props}/>
    )
};

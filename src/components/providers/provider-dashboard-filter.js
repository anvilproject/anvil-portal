/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL dashboard filter provider component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DashboardFilterContext from "../context/dashboard-filter-context";

class ProviderDashboardFilter extends React.Component {

    constructor(props) {
        super(props);

        this.getSearchResults = (query) => {

            if ( !query ) {

                return [];
            }

            const {dashboardFilterProps} = this.state,
                {dashboardIndex} = dashboardFilterProps;

            const queryString = `${query}`;

            const results = dashboardIndex.search(queryString);

            return results.map(result => result.ref)
        };

        this.onChange = (event) => {

            const query = event.target.value;
            const results = this.getSearchResults(query);
            const resultsExist = (query && results.length) || !query;

            this.setState({
                ...this.state,
                dashboardFilterProps: {
                    ...this.state.dashboardFilterProps,
                    query: query,
                    results: results,
                    resultsExist: resultsExist,
                }});
        };

        this.state = ({
            dashboardFilterProps: {
                dashboardIndex: [],
                query: "",
                results: [],
                resultsExist: true},
            onChange: this.onChange
        });
    }

    componentDidMount() {

        this.setState({
            ...this.state,
            dashboardFilterProps: {
                dashboardIndex: window.dashboardIndex,
                query: "",
                results: [],
                resultsExist: true}});
    }

    componentWillUnmount() {

        this.setState = ({
            dashboardFilterProps: {
                dashboardIndex: [],
                query: "",
                results: [],
                resultsExist: true},
            onChange: this.onChange
        });
    }

    render() {
        const {children} = this.props;
        return (
            <DashboardFilterContext.Provider value={this.state}>
                {children}
            </DashboardFilterContext.Provider>
        )
    }
}

export default ProviderDashboardFilter;

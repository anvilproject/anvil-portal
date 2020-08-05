/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search checkboxes component.
 * Wrapper component handling checkbox component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Checkbox from "../checkbox/checkbox";
import DashboardFilterContext from "../context/dashboard-filter-context";
import DataSearchPanel from "../data-search-panel/data-search-panel";
import * as DashboardSearchService from "../../utils/dashboard/dashboard-search.service";

class DataSearchCheckboxes extends React.Component {

    componentDidMount() {

        const {initCheckboxGroups, onInitializeCheckboxGroups} = this.props;

        /* Initialize checkbox groups. */
        onInitializeCheckboxGroups(initCheckboxGroups);
    }

    shouldComponentUpdate(prevProps) {

        const {checkboxGroups} = this.props;

        return prevProps.checkboxGroups !== checkboxGroups;
    }

    render() {
        const {checkboxGroups, onHandleChecked} = this.props;

        const CheckboxGroup = (props) => {
            const {checkboxGroup, onHandleChecked} = props,
                {checkboxes, groupName, property} = checkboxGroup;

            return (
                <DataSearchPanel>
                    <span id="group-label">{groupName}</span>
                    {checkboxes.map((checkbox, c) => <Checkbox key={c} checkbox={checkbox} property={property} onHandleChecked={onHandleChecked}/>)}
                </DataSearchPanel>
            )
        };

        return (
            checkboxGroups.map((checkboxGroup, g) => <CheckboxGroup key={g} checkboxGroup={checkboxGroup} onHandleChecked={onHandleChecked}/>)
        )
    };
}

export default () => {

    const initCheckboxGroups = DashboardSearchService.getDashboardSearchCheckboxGroups();
    const searching = useContext(DashboardFilterContext);

    return (
        <DataSearchCheckboxes initCheckboxGroups={initCheckboxGroups} {...searching}/>
    )
}

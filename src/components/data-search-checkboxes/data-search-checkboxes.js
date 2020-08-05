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

        const {initCheckboxes, onInitializeCheckboxes} = this.props;

        /* Initialize checkboxes. */
        onInitializeCheckboxes(initCheckboxes);
    }

    shouldComponentUpdate(prevProps) {

        const {checkboxes} = this.props;

        return prevProps.checkboxes !== checkboxes;
    }

    render() {
        const {checkboxes, onHandleChecked} = this.props;
        const checkboxesByGroupNames = DashboardSearchService.getCheckboxesByGroupName(checkboxes);

        const Checkboxes = (props) => {
            const {checkboxesByGroupName, onHandleChecked} = props,
                {checkboxes, groupName} = checkboxesByGroupName;

            return (
                <DataSearchPanel>
                    <span id="group-label">{groupName}</span>
                    {checkboxes.map((checkbox, c) => <Checkbox key={c} checkbox={checkbox} onHandleChecked={onHandleChecked}/>)}
                </DataSearchPanel>
            )
        };

        return (
            checkboxesByGroupNames.map((checkboxesByGroupName, b) => <Checkboxes key={b} checkboxesByGroupName={checkboxesByGroupName} onHandleChecked={onHandleChecked}/>)
        )
    };
}

export default () => {

    const initCheckboxes = DashboardSearchService.getDashboardSearchCheckboxes();
    const searching = useContext(DashboardFilterContext);

    return (
        <DataSearchCheckboxes initCheckboxes={initCheckboxes} {...searching}/>
    )
}

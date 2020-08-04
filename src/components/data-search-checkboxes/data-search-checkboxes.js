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
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";
import * as DashboardWorkspaceService from "../../utils/dashboard/dashboard-workspace.service";

class DataSearchCheckboxes extends React.Component {

    componentDidMount() {

        const {onInitializeCheckboxes} = this.props;

        /* Initialize checkboxes. */
        const checkboxes = this.generateCheckboxes();

        onInitializeCheckboxes(checkboxes);
    }

    generateCheckboxes = () => {

        const {accessTypes, consortia, dataTypes} = this.props;

        const accessCheckboxes = accessTypes.map(accessType => {

            return {label: accessType, checked: false, type: "accessUI"}
        });

        const consortiaCheckboxes = consortia.map(consortium => {

            return {label: consortium, checked: false, type: "consortium"}
        });

        const dataTypeCheckboxes = dataTypes.map(dataType => {

            return {label: dataType, checked: false, type: "dataTypes"}
        });

        return consortiaCheckboxes.concat(accessCheckboxes).concat(dataTypeCheckboxes);
    };

    getCheckboxesByType = () => {

        const {checkboxes} = this.props;

        /* Get the set of types. */
        const setOfTypes = new Set(checkboxes.map(checkbox => checkbox.type));

        return [...setOfTypes].map(type => {

            /* Filter checkboxes by type. */
            const checkboxesByType = checkboxes.filter(checkbox => checkbox.type === type);

            /* Build the checkbox by type model. */
            return {
                checkboxes: checkboxesByType,
                type: type
            }
        });
    };

    getCheckboxGroupLabel = (checkbox) => {

        const {type} = checkbox;

        return DashboardTableService.switchDisplayColumnName(type);
    };

    render() {
        const {onHandleChecked} = this.props;
        const checkboxesByTypes = this.getCheckboxesByType();
        return (
            checkboxesByTypes.map((checkboxesByType, b) =>
                <DataSearchPanel key={b}>
                    <span id="group-label">{this.getCheckboxGroupLabel(checkboxesByType)}</span>
                    {checkboxesByType.checkboxes.map((checkbox, c) => <Checkbox key={c} checkbox={checkbox} onHandleChecked={onHandleChecked}/>)}
                </DataSearchPanel>)
        )
    };
}

export default () => {

    const accessTypes = DashboardWorkspaceService.getDashboardWorkspacesAccess();
    const dataTypes = DashboardWorkspaceService.getDashboardWorkspacesDataTypes();
    const consortia = DashboardWorkspaceService.getDashboardWorkspacesConsortia();
    const checkboxes = useContext(DashboardFilterContext);

    return (
        checkboxes ? <DataSearchCheckboxes accessTypes={accessTypes} consortia={consortia} dataTypes={dataTypes} {...checkboxes}/> : null
    )
}

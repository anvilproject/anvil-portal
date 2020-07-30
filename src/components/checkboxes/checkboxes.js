/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - checkboxes component.
 * Wrapper component handling checkbox component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Checkbox from "../checkbox/checkbox";
import DashboardFilterContext from "../context/dashboard-filter-context";
import * as DashboardWorkspaceService from "../../utils/dashboard/dashboard-workspace.service";

class Checkboxes extends React.Component {

    componentDidMount() {

        const {onInitializeCheckboxes} = this.props;

        /* Initialize checkboxes. */
        const checkboxes = this.generateCheckboxes();

        onInitializeCheckboxes(checkboxes);
    }

    generateCheckboxes = () => {

        const {accessTypes, dataTypes} = this.props;

        const accessCheckboxes = accessTypes.map(accessType => {

            return {label: accessType, checked: false, type: "accessUI"}
        });

        const dataTypeCheckboxes = dataTypes.map(dataType => {

            return {label: dataType, checked: false, type: "dataTypes"}
        });

        return accessCheckboxes.concat(dataTypeCheckboxes);
    };

    render() {
        const {checkboxes, onHandleChecked} = this.props;
        return (
            checkboxes.map((checkbox, c) => <Checkbox key={c} checkbox={checkbox} onHandleChecked={onHandleChecked}/>)
        )
    };
}

export default () => {

    const accessTypes = DashboardWorkspaceService.getDashboardWorkspacesAccess();
    const dataTypes = DashboardWorkspaceService.getDashboardWorkspacesDataTypes();
    const checkboxes = useContext(DashboardFilterContext);

    return (
        <Checkboxes accessTypes={accessTypes} dataTypes={dataTypes} {...checkboxes}/>
    )
}

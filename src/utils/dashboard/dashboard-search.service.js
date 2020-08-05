/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service data dashboard workspaces.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
import {DashboardSearchCheckboxWorkspaceProperties} from "./dashboard-search-workspace-property.model";
import * as DashboardSortService from "./dashboard-sort.service";
import * as DashboardTableService from "./dashboard-table.service";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";

/**
 * Returns a FE model of checkboxes, grouped by group name.
 *
 * @param checkboxes
 * @returns {Array}
 */
export function getCheckboxesByGroupName(checkboxes) {

    if ( !checkboxes.length ) {

        return []
    }

    /* Get the set of checkbox group names. */
    const setOfCheckboxGroupNames = new Set(checkboxes.map(checkbox => checkbox.groupName));

    return [...setOfCheckboxGroupNames].map(groupName => {

        /* Filter checkboxes by group name. */
        const checkboxesByGroupName = checkboxes.filter(checkbox => checkbox.groupName === groupName);

        /* Build the checkbox by group model. */
        return {
            checkboxes: checkboxesByGroupName,
            groupName: groupName
        }
    });
}

/**
 * Returns checkbox initialization FE model.
 *
 */
export function getDashboardSearchCheckboxes() {

    const checkboxValuesByProperties = getCheckboxValuesByProperty();

    return buildInitCheckboxes(checkboxValuesByProperties);
}

/**
 * Returns the checkbox FE model for searching over values within the specified workspace properties.
 *
 * @param checkboxValuesByProperties
 * @returns {*}
 */
function buildInitCheckboxes(checkboxValuesByProperties) {

    if ( !checkboxValuesByProperties ) {

        return [];
    }

    return [...checkboxValuesByProperties].reduce((acc, [property, checkboxValues]) => {

        if ( checkboxValues.length ) {

            checkboxValues.forEach(checkboxValue => {

                const checkbox = {
                    checked: false,
                    groupName: DashboardTableService.switchDisplayColumnName(property),
                    label: switchWorkspaceValueDisplayText(checkboxValue),
                    property: property,
                    value: checkboxValue,
                };

                acc.push(checkbox);
            });
        }

        return acc;
    }, []);

}

/**
 * Returns a map of object of checkbox values by workspace property.
 *
 * @returns {Map}
 */
function getCheckboxValuesByProperty() {

    const workspaces = DashboardWorkspaceStaticQuery();

    /* Generate a new map object of checkbox by workspace property as the key. */
    /* For each key, find a set of workspace values corresponding to the workspace property. */
    let checkboxesByProperty = new Map();

    /* For each property, grab the set of corresponding workspace values. */
    DashboardSearchCheckboxWorkspaceProperties.forEach(property => {

        const setOfCheckboxValues = new Set();

        /* Map through workspaces and grab the set of values for the specified workspace property. */
        workspaces.forEach(workspace => {

            /* Return if the value is invalid. */
            if ( isCheckboxValueInvalid(workspace[property]) ) {

                return;
            }

            /* Check the value is an array and grab all values inside the array. */
            if ( DashboardService.isArray(workspace[property]) ) {

                const workspaceValues = workspace[property];

                workspaceValues.forEach(value => {

                    /* Check there are no invalid values inside the array. */
                    if ( !isCheckboxValueInvalid(value) ) {

                        setOfCheckboxValues.add(value)
                    }
                });
            }
            /* Otherwise, grab the value. */
            else {

                const workspaceValue = workspace[property];

                setOfCheckboxValues.add(workspaceValue);
            }
        });

        /* Sort the set of values. */
        const checkboxValues = DashboardSortService.sortData([...setOfCheckboxValues]);

        checkboxesByProperty.set(property, checkboxValues);
    });

    return checkboxesByProperty;
}

/**
 * Returns true if the checkbox value is invalid.
 *
 * @param checkboxValue
 * @returns {boolean}
 */
function isCheckboxValueInvalid(checkboxValue) {

    return !checkboxValue || checkboxValue === "NA";
}

/**
 * Returns workspace text value in format compatible for display.
 *
 * @param value
 * @returns {*}
 */
function switchWorkspaceValueDisplayText(value) {

    switch (value) {
        case "WES":
            return "Whole Exome Sequencing";
        case "WGS":
            return "Whole Genome Sequencing";
        case "VCF":
            return "Variant Call Format";
        default:
            return value;
    }
}

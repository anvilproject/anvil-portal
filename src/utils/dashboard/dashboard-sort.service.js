/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for sorting dashboard data.
 */

/**
 * Sorts an array of data.
 *
 * @param data
 */
export function sortData(data) {

    return data.sort(function (data0, data1) {

        /* Compare and then sort the two values. */
        return compareDataValues(data0, data1);
    })
}

/**
 * A simple comparison between two variables, returning a value to indicate an order of the variables in relation to each other.
 * Used by the sort function.
 *
 * @param value0
 * @param value1
 * @returns {number}
 */
function compareDataValues(value0, value1) {

    const v0 = value0.toLowerCase();
    const v1 = value1.toLowerCase();

    if ( v0 < v1 ) {

        return -1;
    }

    if ( v0 > v1) {

        return 1;
    }

    return 0;
}

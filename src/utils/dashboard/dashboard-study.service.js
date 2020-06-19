/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard study.
 */

/**
 * Returns the count of an array.
 *
 * @param arr
 * @returns {number}
 */
export function getCount(arr) {

    if ( !arr ) {

        return 0;
    }

    return arr.length - 1;
}

/**
 * Returns the first element of an array.
 *
 * @param arr
 * @returns {*}
 */
export function getFirstElement(arr) {

    if ( !arr ) {

        return "";
    }

    return arr[0];
}

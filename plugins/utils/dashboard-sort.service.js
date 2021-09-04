/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for sorting dashboard data.
 */

/**
 * Sorts any dashboard data, by two specified types.
 * If the first type compared is the same value, then the data is sorted by the second type.
 *
 * @param dashboardData
 * @param type0
 * @param type1
 */
const sortDataByDuoTypes = function sortDataByDuoTypes(
  dashboardData,
  type0,
  type1
) {
  return dashboardData.sort(function (data0, data1) {
    /* Sort by first specified type. */
    const firstSort = sortDataValues(data0, data1, type0);

    /* If the first sort has the same value, sort by second specified type and return the sorted outcome. */
    if (firstSort === 0) {
      return sortDataValues(data0, data1, type1);
    }

    /* Return the sorted outcome. */
    return firstSort;
  });
};

/**
 * A simple comparison between two variables, returning a value to indicate an order of the variables in relation to each other.
 * Used by the sort function.
 *
 * @param value0
 * @param value1
 * @returns {number}
 */
function compareDataValues(value0, value1) {
  if (value0 < value1) {
    return -1;
  }

  if (value0 > value1) {
    return 1;
  }

  return 0;
}

/**
 * Returns a lower case string, comprising of non alpha characters.
 *
 * @param str
 * @returns {string}
 */
function removeNonAlphanumericValues(str) {
  if (str && typeof str === "string") {
    return str
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .replace(/\s\s+/g, " ")
      .toLowerCase()
      .trim();
  }

  return str;
}

/**
 * Sets up the comparison between two variables and returns the sorted value.
 *
 * @param data0
 * @param data1
 * @param type
 * @returns {number}
 */
function sortDataValues(data0, data1, type) {
  const type0 = removeNonAlphanumericValues(data0[type]);
  const type1 = removeNonAlphanumericValues(data1[type]);

  /* Compare and then sort the two values. */
  return compareDataValues(type0, type1);
}

module.exports.sortDataByDuoTypes = sortDataByDuoTypes;

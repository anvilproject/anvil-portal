/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic news and events [scoops] service.
 */

/**
 * Returns Date instance of a date string.
 *
 * @param date
 * @returns {Date}
 */
function getDate(date) {
  return new Date(date);
}

/**
 * Returns filtered scoops by start date, by past or upcoming.
 *
 * @param scoops
 * @param past
 */
export function filterScoopsByDate(scoops, past) {
  if (!scoops) {
    return;
  }

  const today = new Date();

  const scoopsByDate = scoops.filter((scoop) => {
    const { frontmatter } = scoop,
      { dateStart } = frontmatter;

    const date = validateDate(dateStart);
    const dateObj = getDate(date);

    // For any valid dates
    if (date) {
      if (past) {
        // Returns scoops if date is older than today
        return dateObj.getTime() <= today.getTime();
      } else {
        // Returns scoops if date is upcoming
        return dateObj.getTime() > today.getTime();
      }
    } else {
      // Return any invalid dates as upcoming events
      // This will highlight any issues with date rendering
      return !past;
    }
  });

  /* Return past events, sorted from latest to earliest. */
  if (past) {
    return scoopsByDate.reverse();
  }

  /* Return future events, sorted from earliest to latest. */
  return scoopsByDate;
}

/**
 * Returns filtered scoops by specified filter terms.
 *
 * @param scoops
 * @param filterStr
 * @returns {*}
 */
export function filterScoopsByFrontmatter(scoops, filterStr) {
  if (!filterStr || !isJSONStringValid(filterStr) || !scoops.length > 0) {
    return scoops;
  }

  const filterTerms = JSON.parse(filterStr);
  const filterNodes = Object.keys(filterTerms);

  return scoops.filter((scoop) => {
    return filterNodes.every(
      (node) => filterTerms[node] === scoop.frontmatter[node]
    );
  });
}

/**
 * Returns date as empty string when date format is invalid.
 *
 * @param date
 * @returns {*}
 */
export function validateDate(date) {
  if (date && date.toLowerCase() === "invalid date") {
    return "";
  }

  return date;
}

/**
 * Returns true if JSON string is valid.
 *
 * @param str
 * @returns {boolean}
 */
function isJSONStringValid(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

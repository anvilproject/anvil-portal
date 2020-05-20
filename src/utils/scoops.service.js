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
 * Returns the scoops' introduction.
 *
 * @param posts
 */
export function getIntroduction(posts) {

    if ( !posts ) {

        return;
    }

    const scoops = posts.filter(post => {

        const slug = getSlug(post);

        return isIntroduction(slug);
    });

    return scoops[0];
}

/**
 * Returns the list of scoops, excluding the introduction.
 *
 * @param posts
 */
export function getScoops(posts) {

    if ( !posts ) {

        return;
    }

    return posts.filter(post => {

        const slug = getSlug(post);

        return !isIntroduction(slug);
    });
}

/**
 * Returns filtered scoops by date, by past or upcoming dates.
 *
 * @param scoops
 * @param past
 */
export function filterScoopsByDate(scoops, past) {

    if ( !scoops ) {

        return;
    }

    const today = new Date();

    const scoopsByDate = scoops.filter(scoop => {

        const date = validateDate(scoop.frontmatter.date);
        const dateObj = getDate(date);

        // For any valid dates
        if ( date ) {

            if ( past ) {

                // Returns scoops if date is older than today
                return dateObj.getTime() <= today.getTime();
            }
            else {

                // Returns scoops if date is upcoming
                return dateObj.getTime() > today.getTime();
            }
        }
        else {

            // Return any invalid dates as upcoming events
            // This will highlight any issues with date rendering
            return !past;
        }
    });

    /* Return past events, sorted from latest to earliest. */
    if ( past ) {

        return scoopsByDate.reverse();
    }

    /* Return future events, sorted from earliest to latest. */
    return scoopsByDate;
}

/**
 * Returns true if any scoops are featured.
 *
 * @param scoops
 * @returns {*}
 */
export function isAnyScoopsFeatured(scoops) {

    if ( !scoops ) {

        return false;
    }

    return scoops.some(scoop => scoop.frontmatter.featured === true)
}

/**
 * Returns date as empty string when date format is invalid.
 *
 * @param date
 * @returns {*}
 */
export function validateDate(date) {

    if ( date && date.toLowerCase() === "invalid date" ) {

        return;
    }

    return date;
}

/**
 * Returns slug for the post, when specified.
 *
 * @param post
 * @returns {string}
 */
function getSlug(post) {

    if ( !post ) {

        return "";
    }

    return post.fields.slug;
}

/**
 * Returns true if the scoop is the introduction.
 *
 * @param slug
 * @returns {boolean}
 */
function isIntroduction(slug) {

    if ( !slug ) {

        return false;
    }

    return slug.includes("intro");
}

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting gatsby-node schema customization.
 */

const moment = require("moment-timezone");

/**
 * Returns the bubble date, as an array i.e. [month, date, year]
 * for easy rendering of the date in bubble format.
 *
 * @param source
 * @returns {[string,string,string]}
 */
const buildDateBubbleField = function buildDateBubbleField(source) {

    const {sessions, timezone} = source || {};

    if ( !sessions ) {

        return [];
    }

    /* Grab a set of sessions. */
    const setOfSessions = getSetOfSessions(sessions, timezone);

    /* Grab the first session. */
    const firstSession = getFirstSession(setOfSessions);

    /* Format the first session and return as a string array [MMM, DD, YYYY]. */
    return firstSession.format("MMM DD YYYY").split(" ");
};

/**
 * Returns the start date, taken from the earliest "session" date.
 *
 *
 * @param source
 * @returns {*}
 */
const buildDateStartField = function buildDateStartField(source) {

    const {sessions, timezone} = source || {};

    if ( !sessions ) {

        return "";
    }

    /* Grab a set of sessions. */
    const setOfSessions = getSetOfSessions(sessions, timezone);

    /* Grab the first session. */
    const firstSession = getFirstSession(setOfSessions);

    /* Return formatted first session. */
    return firstSession.toDate();
};

/**
 * Returns true if the markdown does not exist as a page (and is therefore flagged as denied).
 * This may be because the markdown is not in the site map, or the markdown is in draft mode.
 * Draft mode is defined by the site map field "draft".
 * Typically used by carousel, news and events static queries to ensure any draft documents are excluded when in draft mode.
 *
 * @param source
 * @param pages
 * @returns {boolean}
 */
const buildDeniedField = function buildDeniedField(source, pages) {

    if ( pages ) {

        const pageCreated = pages.some(page => page.context.slug === source.fields.slug);

        return !pageCreated;
    }

    return false;
};

/**
 * Returns an array of header values, comprising of header display name, and header path.
 *
 * @param source
 * @param items
 * @returns {Array}
 */
const buildHeadersField = function buildHeadersField(source, items) {

    const {menuItems} = source;

    if ( items && items.length && menuItems && menuItems.length ) {

        return menuItems.reduce((acc, menuItem) => {

            const header = items.find(item => item.menuItem === menuItem);

            /* Accumulate header if it exists. */
            if ( header && Object.keys(header).length > 0 ) {

                const name = header.menuItem;
                const path = header.pathPartial;

                const item = {name: name, path: path};
                acc.push(item);
            }
            else {

                console.log(`*** *** Error. Header ${menuItem} not found.`);
            }

            return acc;
        }, [])
    }

    return [];
};

/**
 * Returns the session in a displayable format.
 *
 * @param source
 * @returns {Array}
 */
const buildSessionsDisplayField = function buildSessionsDisplayField(source) {

    const {sessions, timezone} = source || {};

    if ( !sessions ) {

        return [];
    }

    /* Return reformatted sessions into a string array. */
    return reformatToDisplayableSessions(sessions, timezone);
};

/**
 * Converts a date value to a moment object.
 *
 * @param date
 * @param timezone
 * @returns {*}
 */
function convertSessionDateToMoment(date, timezone = "") {

    if ( !date ) {

        return "";
    }

    return moment.tz(date, ["D MMM YYYY h:mm A", "D MMM YYYY"], timezone);
}

/**
 * Returns a set of sessions, each session as a moment object.
 *
 * @param sessions
 * @param timezone
 * @returns {*}
 */
function getSetOfSessions(sessions, timezone) {

    /* Grab a complete set of sessions. */
    const setOfSessions = new Set();

    sessions.forEach(session => {

        const {sessionEnd, sessionStart} = session || {};

        if ( sessionEnd ) {

            setOfSessions.add(convertSessionDateToMoment(session.sessionEnd, timezone));
        }

        if ( sessionStart ) {

            setOfSessions.add(convertSessionDateToMoment(session.sessionStart, timezone));
        }
    });

    return setOfSessions;
}

/**
 * Returns the earliest session as a moment object.
 *
 * @param setOfSessions
 * @returns {*}
 */
function getFirstSession(setOfSessions) {

    /* Sort the sessions ASC. */
    const sortedSessions = [...setOfSessions].sort((moment01, moment02) => moment01.diff(moment02));

    /* Return the first session. */
    return sortedSessions.shift();
}

/**
 * Returns the sessions in a FE displayable format.
 *
 * @param sessions
 * @param timezone
 * @returns {Array}
 */
function reformatToDisplayableSessions(sessions, timezone) {

    return sessions.map(session => {

        const {sessionEnd, sessionStart} = session || {};

        /* Grab the various formatting styles for display of each session. */
        const formatByTimeWithPeriod = "h:mm A";
        const formatByTimeWithTZ = `${formatByTimeWithPeriod} zz`;
        const formatByDate = "dddd MMMM D YYYY";
        const formatByTime24Hr = "HH:mm"; // Used to check if time is specified for event

        /* Start and end sessions. */
        /* Both start and end sessions are expected to have time values. */
        /* i.e. A start session without a time, having an end session (also without a time, but perhaps on the next day)
         * is indicative of improper use of the frontmatter field "sessions". */
        /* Returns the session display string e.g. "Friday July 17 2020 09:16 AM to 11:45 AM EST". */
        if ( sessionStart && sessionEnd ) {

            /* Format the session start and end display strings. */
            const startDisplayStr = convertSessionDateToMoment(sessionStart, timezone).format(`${formatByDate} ${formatByTimeWithPeriod}`);
            const endDisplayStr = convertSessionDateToMoment(sessionEnd, timezone).format(formatByTimeWithTZ);

            return `${startDisplayStr} to ${endDisplayStr}`;
        }

        /* Start session only. */
        /* Returns either "Friday Jul 17 2020 09:16 AM EST" if a time is specified
         * or "Friday Jul 17 2020" if no time has been specified with the start session. */
        if ( sessionStart ) {

            /* Grab the session start moment. */
            const startMoment = convertSessionDateToMoment(sessionStart, timezone);

            /* Returns the start session without time, if no time has been specified. */
            /* e.g. "Friday Jul 17 2020". */
            if ( startMoment.format(formatByTime24Hr) === "00:00" ) {

                return startMoment.format(formatByDate);
            }

            /* Returns the start session with time. */
            /* e.g. "Friday Jul 17 2020 09:16 AM". */
            return convertSessionDateToMoment(sessionStart, timezone).format(`${formatByDate} ${formatByTimeWithTZ}`);
        }

        return "";
    })
}

module.exports.buildDateBubbleField = buildDateBubbleField;
module.exports.buildDateStartField = buildDateStartField;
module.exports.buildDeniedField = buildDeniedField;
module.exports.buildHeadersField = buildHeadersField;
module.exports.buildSessionsDisplayField = buildSessionsDisplayField;

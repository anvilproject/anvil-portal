/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
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
        const formatByDate = "dddd MMM D YYYY";
        const formatByDateTime = "dddd MMM D YYYY h:mm A";
        const formatByTime = "HH:mm";
        const formatByTimeWithPeriod = "h:mm A";

        /* Start and end sessions. */
        /* Both start and end sessions are expected to have time values. */
        /* i.e. A start session without a time, having an end session (also without a time, but perhaps on the next day)
         * is indicative of improper use of the frontmatter field "sessions". */
        /* Returns the session display string e.g. "Friday Jul 17 2020 09:16 AM to 11:45 AM". */
        if ( sessionStart && sessionEnd ) {

            /* Format the session start and end display strings. */
            const startDisplayStr = convertSessionDateToMoment(sessionStart, timezone).format(formatByDateTime);
            const endDisplayStr = convertSessionDateToMoment(sessionEnd, timezone).format(formatByTimeWithPeriod);

            return `${startDisplayStr} to ${endDisplayStr}`;
        }

        /* Start session only. */
        /* Returns either "Friday Jul 17 2020 09:16 AM" if a time is specified
         * or "Friday Jul 17 2020" if no time has been specified with the start session. */
        if ( sessionStart ) {

            /* Grab the session start moment. */
            const startMoment = convertSessionDateToMoment(sessionStart, timezone);

            /* Returns the start session without time, if no time has been specified. */
            /* e.g. "Friday Jul 17 2020". */
            if ( startMoment.format(formatByTime) === "00:00" ) {

                return startMoment.format(formatByDate);
            }

            /* Returns the start session with time. */
            /* e.g. "Friday Jul 17 2020 09:16 AM". */
            return convertSessionDateToMoment(sessionStart, timezone).format(formatByDateTime);
        }

        return "";
    })
}

module.exports.buildDateBubbleField = buildDateBubbleField;
module.exports.buildDateStartField = buildDateStartField;
module.exports.buildSessionsDisplayField = buildSessionsDisplayField;

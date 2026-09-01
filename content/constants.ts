export const DATE_FORMAT = "MMMM DD, YYYY";

/* Session date authored as a day only e.g. "1 September 2026". */
export const FORMAT_SESSION_DATE = "D MMM YYYY";

/* Session date authored with a time e.g. "1 September 2026 5:30 PM". */
export const FORMAT_SESSION_DATE_TIME = "D MMM YYYY h:mm A";

/* Accepted session date formats, in match precedence order. */
export const FORMATS_SESSION_DATE = [
  FORMAT_SESSION_DATE_TIME,
  FORMAT_SESSION_DATE,
];

export const RECENT_CONTENT_MONTHS = 3;

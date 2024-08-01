import { EVENTS_VIEW } from "../hooks/useEvents/common/entities";

export const DIR_NAME = "events";

export const EVENTS_VIEW_TABS = [
  { label: "Upcoming", value: EVENTS_VIEW.UPCOMING },
  { label: "Past", value: EVENTS_VIEW.PAST },
];

export const FORMAT_DATE = "MMM,DD,YYYY";

export const FORMAT_SESSION_DATE = "dddd, MMMM D, YYYY";

export const FORMAT_SESSION_DATE_TIME = "dddd, MMMM D, YYYY h:mm A";

export const FORMAT_SESSION_DATE_TIME_TIMEZONE = "dddd, MMMM D, YYYY h:mm A zz";

export const FORMAT_SESSION_TIME_TIMEZONE = "h:mm A zz";

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Possible carousel action values.
 * Calculated from carousel mouse and touch interactions.
 */

enum CarouselAction {
  NONE = "NONE",
  SCROLL = "SCROLL",
  SELECT = "SELECT",
  SWIPE_BACKWARD = "SWIPE_BACKWARD",
  SWIPE_FORWARD = "SWIPE_FORWARD",
}

export default CarouselAction;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Possible values of button CTA navigation method:
 * - HTML_ANCHOR - standard external navigation using anchor tag,
 * - IN_ROUTE_NAV - in-route navigation with a hash also using anchor tag, or
 * - GATSBY_LINK - in-route navigation using gatsby link.
 */

enum ButtonCtaNavigationMethod {
  GATSBY_LINK = "GATSBY_LINK",
  HTML_ANCHOR = "HTML_ANCHOR",
  IN_ROUTE_HTML_ANCHOR = "IN_ROUTE_HTML_ANCHOR",
}

export default ButtonCtaNavigationMethod;

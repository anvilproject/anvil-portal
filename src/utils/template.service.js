/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic content template service.
 */

/**
 * Returns the page title for the specified page, generated from the first h1 on the page.
 *
 * @param htmlAst
 * @returns {string}
 */
export function getPageTitle(htmlAst) {
  if (!htmlAst) {
    return "";
  }

  // Find the top-level of the page
  const h1 = htmlAst.children.find((child) => child.tagName === "h1");
  if (!h1) {
    return "";
  }

  // Return text node of h1
  return h1.children.find((child) => child.type === "text").value || "";
}

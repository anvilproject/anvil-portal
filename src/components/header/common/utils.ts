/**
 * Returns true if the given link is an internal link.
 * @param link - Link.
 * @returns true if the given link is an internal link.
 */
export function isClientSideNavigation(link: string): boolean {
  return /^\/(?!\/)/.test(link);
}

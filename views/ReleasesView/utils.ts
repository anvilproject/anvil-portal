import { Release } from "./types";

/**
 * Groups releases by year.
 * @param releases - Releases.
 * @returns releases grouped by year.
 */
export function groupReleasesByYear(
  releases: Release[]
): Map<string, Release[]> {
  const map = new Map<string, Release[]>();

  releases.forEach((release) => {
    const year = release.year;
    if (!map.has(year)) {
      map.set(year, []);
    }
    map.get(year)?.push(release);
  });

  return map;
}

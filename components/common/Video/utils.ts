/**
 * Asserts that a video has a descriptive title, its iframe's accessible name.
 * MDX is not type-checked, so this fails the build when a title is missing.
 * @param title - Title of the video.
 * @param src - Source URL of the video, used to identify it in the error.
 */
export function assertVideoTitle(
  title: string | undefined,
  src: string | undefined
): void {
  if (!title?.trim()) {
    throw new Error(`Video "${src}" requires a descriptive title.`);
  }
}

import type { JSX } from "react";
import type { VideoProps } from "./types";
import { assertVideoTitle } from "./utils";

/**
 * Renders an embedded video, named by its title for screen readers.
 * Throws when the title is missing so an unnamed embed fails the build.
 * Props are spread first so the iframe's sandbox and permissions can't be overridden.
 * @param props - Video props.
 * @param props.title - Descriptive title of the video, used as the iframe's accessible name.
 * @returns embedded video iframe.
 */
export const Video = ({ title, ...props }: VideoProps): JSX.Element => {
  assertVideoTitle(title, props.src);
  return (
    <iframe
      {...props}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      height="100%"
      sandbox="allow-scripts allow-same-origin allow-presentation"
      title={title}
      width="100%"
    />
  );
};

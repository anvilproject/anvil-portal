import { InlineFrame } from "./video.styles";

export interface VideoProps {
  className?: string;
  src: string;
}

export const Video = ({
  className,
  src,
  ...props /* Spread props to allow for iframe specific props e.g. "width". */
}: VideoProps): JSX.Element => {
  return (
    <InlineFrame
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={className}
      src={src}
      {...props}
    />
  );
};

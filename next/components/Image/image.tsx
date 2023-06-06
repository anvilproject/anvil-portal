import React from "react";
import {
  StaticImage,
  StaticImageProps,
} from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { Caption, ImageWithCaption } from "./image.styles";

export interface ImageProps extends StaticImageProps {
  caption?: string;
}

export const Image = ({
  alt,
  caption,
  height,
  src,
  width,
}: ImageProps): JSX.Element => {
  return (
    <ImageWithCaption>
      <StaticImage alt={alt} height={height} src={src} width={width} />
      {caption && <Caption>{caption}</Caption>}
    </ImageWithCaption>
  );
};

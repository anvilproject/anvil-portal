import {
  StaticImage,
  StaticImageProps,
} from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { Caption, ImageWithCaption } from "./image.styles";

export interface ImageProps extends StaticImageProps {
  caption?: string;
}

export const Image = ({
  caption,
  ...props /* Spread props to allow for StaticImage specific props StaticImageProps e.g. "height". */
}: ImageProps): JSX.Element => {
  return (
    <ImageWithCaption>
      <StaticImage {...props} />
      {caption && <Caption>{caption}</Caption>}
    </ImageWithCaption>
  );
};

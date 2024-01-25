import {
  StaticImage,
  StaticImageProps,
} from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { CardMedia as Media } from "./cardMedia.styles";

export interface CardMediaProps {
  className?: string;
  media: StaticImageProps;
}

export const CardMedia = ({
  className,
  media,
}: CardMediaProps): JSX.Element => {
  return (
    <Media className={className}>
      <StaticImage
        alt={media.alt}
        height={media.height}
        src={media.src}
        width={media.width}
      />
    </Media>
  );
};

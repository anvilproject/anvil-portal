import { SouthIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/SouthIcon/southIcon";
import { CarouselAction } from "../../common/entities";
import { IconButton } from "./arrow.styles";

interface ArrowProps {
  carouselAction: CarouselAction;
  onClick: () => void;
}

export const Arrow = ({ carouselAction, onClick }: ArrowProps): JSX.Element => {
  return (
    <IconButton
      carouselAction={carouselAction}
      color="secondary"
      onClick={onClick}
      size="large"
    >
      <SouthIcon fontSize="small" />
    </IconButton>
  );
};

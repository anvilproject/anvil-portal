import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { BaseComponentProps } from "@databiosphere/findable-ui/lib/components/types";
import { CardActionArea } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardActionArea/cardActionArea";
import { CardProps } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import { ForwardArrowIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { CardContent, StyledCard } from "./ctaCard.styles";
import { Typography } from "@mui/material";
import { Props } from "./types";
import { CARD_PROPS, SVG_ICON_PROPS, TYPOGRAPHY_PROPS } from "./constants";

export const CTACard = ({
  cardUrl,
  className,
  EndIcon = ForwardArrowIcon,
  secondaryText,
  StartIcon,
  title,
}: BaseComponentProps &
  Pick<CardProps, "cardUrl" | "secondaryText" | "title"> &
  Props): JSX.Element => {
  return (
    <StyledCard {...CARD_PROPS} className={className}>
      <CardActionArea cardUrl={cardUrl}>
        {StartIcon && <StartIcon sx={{ fontSize: 48 }} />}
        <EndIcon {...SVG_ICON_PROPS} />
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <Typography {...TYPOGRAPHY_PROPS}>{secondaryText}</Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { ForwardArrowIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { SectionCardWithLink } from "../../../../../../../../common/entities";
import {
  CardContent,
  CardCTA,
  CardSection,
  GridCard,
} from "../../../../../../../Card/card.styles";
import { CardMedia } from "../../../../../../../Card/components/CardMedia/cardMedia";
import { CardHeader, CardTitle } from "./card.styles";

export interface CardProps {
  card: SectionCardWithLink;
}

export const Card = ({ card }: CardProps): JSX.Element => {
  const { link, media, text, title } = card;
  return (
    <GridCard component={RoundedPaper}>
      <MCardActionArea
        href={link.url}
        rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
        target={link.target || ANCHOR_TARGET.BLANK}
      >
        <CardSection>
          <CardHeader>
            {media && <CardMedia media={media} />}
            <CardCTA>
              <ForwardArrowIcon color="primary" fontSize="small" />
            </CardCTA>
          </CardHeader>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            {text && <CardSecondaryText>{text}</CardSecondaryText>}
          </CardContent>
        </CardSection>
      </MCardActionArea>
    </GridCard>
  );
};

import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { ForwardArrowIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { isClientSideNavigation } from "@databiosphere/findable-ui/lib/components/Links/common/utils";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import {
  CardActionArea as MCardActionArea,
  Link as MLink,
  Typography as MTypography,
} from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { SectionCardWithLink } from "../../../../../../../../common/entities";
import {
  GridCardContent as CardContent,
  CardCTA,
  GridCard,
} from "../../../../../../../Card/card.styles";
import { StyledCardSection } from "./card.styles";

export interface CardProps {
  card: SectionCardWithLink;
}

export const Card = ({ card }: CardProps): JSX.Element => {
  const {
    link: { rel, target, url },
    text,
    title,
  } = card;
  return (
    <GridCard component={RoundedPaper}>
      <MCardActionArea
        component={isClientSideNavigation(url) ? Link : MLink}
        href={url}
        rel={rel || REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
        target={target || ANCHOR_TARGET.BLANK}
      >
        <StyledCardSection>
          <CardContent>
            <MTypography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
              {title}
            </MTypography>
            <CardSecondaryText>{text}</CardSecondaryText>
          </CardContent>
          <CardCTA>
            <ForwardArrowIcon
              color={SVG_ICON_PROPS.COLOR.PRIMARY}
              fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL}
            />
          </CardCTA>
        </StyledCardSection>
      </MCardActionArea>
    </GridCard>
  );
};

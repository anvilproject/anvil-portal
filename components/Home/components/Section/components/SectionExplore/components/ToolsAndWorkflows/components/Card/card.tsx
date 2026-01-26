import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { ForwardArrowIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import {
  CardActionArea as MCardActionArea,
  Link as MLink,
  Typography as MTypography,
} from "@mui/material";
import { JSX } from "react";
import { SectionCardWithLink } from "../../../../../../../../common/entities";
import {
  CardCTA,
  GridCard,
  GridCardContent as CardContent,
} from "../../../../../../../Card/card.styles";
import { isClientSideNavigation } from "@databiosphere/findable-ui/lib/components/Links/common/utils";
import Link from "next/link";
import { StyledCardSection } from "./card.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";

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

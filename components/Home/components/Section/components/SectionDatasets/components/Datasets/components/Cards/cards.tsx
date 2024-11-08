import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { ForwardArrowIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { Fragment } from "react";
import { SectionCardWithLink } from "../../../../../../../../common/entities";
import { CardCTA } from "../../../../../../../Card/card.styles";
import { Card, CardContent, CardSection } from "./cards.styles";

interface CardsProps {
  cards: SectionCardWithLink[];
}

export const Cards = ({ cards }: CardsProps): JSX.Element => {
  return (
    <Fragment>
      {cards.map(({ link, text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <MCardActionArea
            href={link.url}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={link.target || ANCHOR_TARGET.SELF}
          >
            <CardSection>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                {text && <CardSecondaryText>{text}</CardSecondaryText>}
              </CardContent>
              <CardCTA>
                <ForwardArrowIcon color="primary" fontSize="small" />
              </CardCTA>
            </CardSection>
          </MCardActionArea>
        </Card>
      ))}
    </Fragment>
  );
};

import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { Fragment } from "react";
import { ForwardArrowIcon } from "../../../../../../../../../common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
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
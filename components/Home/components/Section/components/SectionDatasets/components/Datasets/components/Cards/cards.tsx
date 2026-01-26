import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Fragment, JSX } from "react";
import { SectionCard } from "../../../../../../../../common/entities";
import { Card, CardContent, CardSection } from "./cards.styles";

interface CardsProps {
  cards: Omit<SectionCard, "links">[];
}

export const Cards = ({ cards }: CardsProps): JSX.Element => {
  return (
    <Fragment>
      {cards.map(({ text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <CardSection>
            <CardContent>
              <CardTitle>{title}</CardTitle>
              {text && <CardSecondaryText>{text}</CardSecondaryText>}
            </CardContent>
          </CardSection>
        </Card>
      ))}
    </Fragment>
  );
};

import { useSectionsData } from "../../../../../../providers/sectionsData";
import {
  Card,
  CardContent,
  CardSecondaryText,
  CardSection,
  CardTitle,
  CloudBenefits as BenefitCards,
  Media,
} from "./cloudBenefits.styles";

export const CloudBenefits = (): JSX.Element => {
  const { cloudCards: cards } = useSectionsData();
  return (
    <BenefitCards>
      {cards.map(({ media, text, title }, i) => (
        <Card key={i} elevation={0}>
          <CardSection>
            {media && <Media media={media} />}
            <CardContent>
              <CardTitle>{title}</CardTitle>
              {text && <CardSecondaryText>{text}</CardSecondaryText>}
            </CardContent>
          </CardSection>
        </Card>
      ))}
    </BenefitCards>
  );
};

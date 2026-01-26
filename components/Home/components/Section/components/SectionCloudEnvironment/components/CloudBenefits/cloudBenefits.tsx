import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { JSX } from "react";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { CardMedia } from "../../../../../Card/components/CardMedia/cardMedia";
import {
  Card,
  CardContent,
  CardSecondaryTitle,
  CardSection,
  Grid,
} from "./cloudBenefits.styles";

export const CloudBenefits = (): JSX.Element => {
  const { cloudCards: cards } = useSectionsData();
  return (
    <Grid>
      {cards.map(({ media, text, title }, i) => (
        <Card key={i} elevation={0}>
          <CardSection>
            {media && <CardMedia media={media} />}
            <CardContent>
              <CardTitle>{title}</CardTitle>
              {text && <CardSecondaryTitle>{text}</CardSecondaryTitle>}
            </CardContent>
          </CardSection>
        </Card>
      ))}
    </Grid>
  );
};

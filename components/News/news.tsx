import { CardContent } from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardText/cardText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { CardActionArea, Card as MCard } from "@mui/material";
import { useRouter } from "next/router";
import { JSX } from "react";
import { FrontmatterNews } from "../../content/entities";
import { CardSection, NewsView } from "./news.styles";

interface NewsProps {
  news: FrontmatterNews[];
}

export const News = ({ news }: NewsProps): JSX.Element => {
  const { push } = useRouter();

  /**
   * Redirects to the news article.
   * @param route - Route.
   */
  const onClick = (route: string | null): void => {
    if (!route) return;
    push(route);
  };

  return (
    <NewsView>
      {news.map(({ date, description, title, url }, i) => (
        <MCard key={i} component={FluidPaper}>
          <CardActionArea onClick={(): void => onClick(url)}>
            <CardSection>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardText>{description}</CardText>
                <CardSecondaryText>{date}</CardSecondaryText>
              </CardContent>
            </CardSection>
          </CardActionArea>
        </MCard>
      ))}
    </NewsView>
  );
};

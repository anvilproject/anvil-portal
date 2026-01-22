import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/RoundedPaper/roundedPaper";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { CardContent, CardHeader, Divider, Stack } from "@mui/material";
import { ReleaseData } from "../../data/types";
import { StyledCard } from "../Card/card.styles";
import { Subheader } from "../Card/components/Subheader/subheader";
import { Title } from "../Card/components/Title/title";
import { CardActions } from "./components/CardActions/cardActions";

export const DataAdditions = ({
  dataAdditions,
}: ReleaseData): JSX.Element | null => {
  if (!dataAdditions || dataAdditions.length === 0) return null;
  return (
    <Stack spacing={4} useFlexGap>
      {dataAdditions.map(({ releaseNotes, ...release }) => (
        <StyledCard key={release.studyName} component={RoundedPaper}>
          <CardHeader
            disableTypography
            subheader={<Subheader {...release} />}
            title={<Title {...release} />}
          />
          <CardContent>
            <MarkdownRenderer value={releaseNotes} />
          </CardContent>
          <Divider />
          <CardActions {...release} />
        </StyledCard>
      ))}
    </Stack>
  );
};

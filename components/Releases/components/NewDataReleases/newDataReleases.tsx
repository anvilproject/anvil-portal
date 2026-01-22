import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/RoundedPaper/roundedPaper";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { CardContent, CardHeader, Divider, Stack } from "@mui/material";
import { ReleaseData } from "../../data/types";
import { CardActions } from "./components/CardActions/cardActions";
import { Subheader } from "./components/Subheader/subheader";
import { Title } from "./components/Title/title";
import { StyledCard } from "./newDataReleases.styles";

export const NewDataReleases = ({
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

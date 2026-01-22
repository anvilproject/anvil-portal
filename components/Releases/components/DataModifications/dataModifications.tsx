import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/RoundedPaper/roundedPaper";
import { CardContent, CardHeader, Stack } from "@mui/material";
import { ReleaseData } from "../../data/types";
import { StyledCard } from "../Card/card.styles";
import { Subheader } from "../Card/components/Subheader/subheader";
import { Title } from "../Card/components/Title/title";
import { StyledMarkdownRenderer } from "./dataModifications.styles";

export const DataModifications = ({
  dataModifications,
}: ReleaseData): JSX.Element | null => {
  if (!dataModifications || dataModifications.length === 0) return null;
  return (
    <Stack spacing={4} useFlexGap>
      {dataModifications.map(({ releaseNotes, ...release }) => (
        <StyledCard key={release.studyName} component={RoundedPaper}>
          <CardHeader
            disableTypography
            subheader={<Subheader {...release} />}
            title={<Title {...release} />}
          />
          <CardContent>
            <StyledMarkdownRenderer value={releaseNotes} />
          </CardContent>
        </StyledCard>
      ))}
    </Stack>
  );
};

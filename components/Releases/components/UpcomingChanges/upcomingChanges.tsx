import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/RoundedPaper/roundedPaper";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { CardContent, CardHeader, Stack } from "@mui/material";
import { JSX } from "react";
import { ReleaseData } from "../../data/types";
import { StyledCard } from "../Card/card.styles";
import { Subheader } from "../Card/components/Subheader/subheader";
import { Title } from "../Card/components/Title/title";

export const UpcomingChanges = ({
  upcomingChanges,
}: ReleaseData): JSX.Element | null => {
  if (!upcomingChanges || upcomingChanges.length === 0) return null;
  return (
    <Stack spacing={4} useFlexGap>
      {upcomingChanges.map(({ description, ...release }) => (
        <StyledCard key={release.studyName} component={RoundedPaper}>
          <CardHeader
            disableTypography
            subheader={<Subheader {...release} />}
            title={<Title {...release} />}
          />
          <CardContent>
            <MarkdownRenderer value={description} />
          </CardContent>
        </StyledCard>
      ))}
    </Stack>
  );
};

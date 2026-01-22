import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/RoundedPaper/roundedPaper";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { CardHeader, Stack } from "@mui/material";
import { ReleaseData } from "../../data/types";
import { StyledCard } from "../Card/card.styles";
import { Datasets } from "../Card/components/Datasets/datasets";
import { Subheader } from "../Card/components/Subheader/subheader";
import { Title } from "../Card/components/Title/title";
import { StyledCardContent } from "./dataModifications.styles";

export const DataModifications = ({
  dataModifications,
}: ReleaseData): JSX.Element | null => {
  if (!dataModifications || dataModifications.length === 0) return null;
  return (
    <Stack spacing={4} useFlexGap>
      {dataModifications.map(
        ({ datasetsAffected, releaseNotes, ...release }) => (
          <StyledCard key={release.studyName} component={RoundedPaper}>
            <CardHeader
              disableTypography
              subheader={<Subheader {...release} />}
              title={<Title {...release} />}
            />
            <StyledCardContent>
              <MarkdownRenderer value={releaseNotes} />
              <Datasets datasetsAffected={datasetsAffected} />
            </StyledCardContent>
          </StyledCard>
        )
      )}
    </Stack>
  );
};

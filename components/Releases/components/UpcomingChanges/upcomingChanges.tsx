import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/RoundedPaper/roundedPaper";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { CardContent, CardHeader, Stack, Typography } from "@mui/material";
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
            <Stack spacing={2} useFlexGap>
              <Typography
                color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
                component="div"
                variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
              >
                Upcoming Changes
              </Typography>
              <MarkdownRenderer value={description} />
            </Stack>
          </CardContent>
        </StyledCard>
      ))}
    </Stack>
  );
};

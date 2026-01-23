import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/RoundedPaper/roundedPaper";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Stack, Typography } from "@mui/material";
import { ReleaseData } from "../../data/types";
import { StyledCard } from "../Card/card.styles";
import { Datasets } from "../Card/components/Datasets/datasets";
import { StyledCardContent } from "./enhancements.styles";

export const Enhancements = ({
  enhancements,
}: ReleaseData): JSX.Element | null => {
  if (!enhancements || enhancements.length === 0) return null;
  return (
    <Stack spacing={4} useFlexGap>
      {enhancements.map(({ datasetsAffected, description }, i) => (
        <StyledCard key={i} component={RoundedPaper}>
          <StyledCardContent>
            <MarkdownRenderer value={description} />
            {datasetsAffected && datasetsAffected.length > 0 && (
              <Stack spacing={2} useFlexGap>
                <Typography
                  color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
                  component="div"
                  variant={TYPOGRAPHY_PROPS.VARIANT.UPPERCASE_500}
                >
                  Datasets Affected
                </Typography>
                <Datasets datasetsAffected={datasetsAffected} />
              </Stack>
            )}
          </StyledCardContent>
        </StyledCard>
      ))}
    </Stack>
  );
};

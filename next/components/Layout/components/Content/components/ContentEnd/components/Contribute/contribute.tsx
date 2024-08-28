import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import {
  TEXT_BODY_400,
  TEXT_BODY_LARGE_500,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Button as MButton, Typography } from "@mui/material";
import { CodePullRequestIcon } from "../../../../../../../common/CustomIcon/components/CodePullRequestIcon/codePullRequestIcon";
import { StyledBox } from "./contribute.styles";

const GITHUB_URL =
  "https://github.com/anvilproject/anvil-portal/blob/main/next/docs";

interface ContributeProps {
  slug?: string[];
}

export const Contribute = ({ slug }: ContributeProps): JSX.Element => {
  return (
    <StyledBox>
      <Typography component="div" variant={TEXT_BODY_LARGE_500}>
        Help us make these docs great!
      </Typography>
      <Typography color="ink.light" component="div" variant={TEXT_BODY_400}>
        All AnVIL docs are open source. See something that’s wrong or unclear?
        Submit a pull request.
      </Typography>
      <MButton
        color="secondary"
        disabled={slug?.length === 0}
        href={getGitHubUrl(slug)}
        startIcon={<CodePullRequestIcon color="inkLight" />}
        target={ANCHOR_TARGET.BLANK}
        variant="contained"
      >
        Make a contribution
      </MButton>
    </StyledBox>
  );
};

/**
 * Returns the GitHub URL for the given slug.
 * @param slug - Slug.
 * @returns GitHub URL.
 */
function getGitHubUrl(slug?: string[]): string {
  if (!slug) return "";
  return `${GITHUB_URL}/${slug.join("/")}.mdx`;
}

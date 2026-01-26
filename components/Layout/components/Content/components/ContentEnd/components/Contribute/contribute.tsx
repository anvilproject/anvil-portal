import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Button as MButton, Typography } from "@mui/material";
import { JSX } from "react";
import { CodePullRequestIcon } from "../../../../../../../common/CustomIcon/components/CodePullRequestIcon/codePullRequestIcon";
import { StyledBox } from "./contribute.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";

const GITHUB_URL =
  "https://github.com/anvilproject/anvil-portal/blob/main/docs";

interface ContributeProps {
  slug?: string[];
}

export const Contribute = ({ slug }: ContributeProps): JSX.Element => {
  return (
    <StyledBox>
      <Typography
        component="div"
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
      >
        Help us make these docs great!
      </Typography>
      <Typography
        color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
        component="div"
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
      >
        All AnVIL docs are open source. See something that’s wrong or unclear?
        Submit a pull request.
      </Typography>
      <MButton
        {...BUTTON_PROPS.SECONDARY_CONTAINED}
        disabled={slug?.length === 0}
        href={getGitHubUrl(slug)}
        startIcon={
          <CodePullRequestIcon color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />
        }
        rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
        target={ANCHOR_TARGET.BLANK}
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

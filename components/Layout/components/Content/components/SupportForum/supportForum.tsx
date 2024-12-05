import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import {
  TEXT_BODY_LARGE_400_2_LINES,
  TEXT_HEADING,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Button, Typography } from "@mui/material";
import { PATH_PARAMETERS } from "../../../../../../common/constants";
import { StyledPaper } from "./supportForum.styles";

export const SupportForum = (): JSX.Element => {
  return (
    <StyledPaper>
      <Typography component="h3" variant={TEXT_HEADING}>
        AnVIL Support Forum
      </Typography>
      <Typography
        component="p"
        color="ink.light"
        mb={4}
        mt={1}
        variant={TEXT_BODY_LARGE_400_2_LINES}
      >
        Be sure to check out the AnVIL Community for support, plus tips & tricks
        from our users and much more.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        href={PATH_PARAMETERS.anvilHelpURL}
        rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
        target={ANCHOR_TARGET.BLANK}
      >
        Join the forum
      </Button>
    </StyledPaper>
  );
};

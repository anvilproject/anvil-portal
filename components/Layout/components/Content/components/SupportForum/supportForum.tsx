import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { BUTTON_PRESETS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/presets";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Button, Typography } from "@mui/material";
import { JSX } from "react";
import { PATH_PARAMETERS } from "../../../../../../common/constants";
import { StyledPaper } from "./supportForum.styles";

export const SupportForum = (): JSX.Element => {
  return (
    <StyledPaper>
      <Typography component="h3" variant={TYPOGRAPHY_PROPS.VARIANT.HEADING}>
        AnVIL Support Forum
      </Typography>
      <Typography
        component="p"
        color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
        mb={4}
        mt={1}
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400_2_LINES}
      >
        Be sure to check out the AnVIL Community for support, plus tips & tricks
        from our users and much more.
      </Typography>
      <Button
        {...BUTTON_PRESETS.SECONDARY_OUTLINED}
        href={PATH_PARAMETERS.anvilHelpURL}
        rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
        target={ANCHOR_TARGET.BLANK}
      >
        Join the forum
      </Button>
    </StyledPaper>
  );
};

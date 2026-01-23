import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { CardActions as MCardActions } from "@mui/material";
import { URL_DISPLAY_ORDER, URL_KEY_TO_LABEL_MAP } from "./constants";
import { Props } from "./types";

export const CardActions = (release: Props): JSX.Element | null => {
  return (
    <MCardActions disableSpacing>
      {URL_DISPLAY_ORDER.map((key) => {
        if (!release[key]) return null;
        return (
          <Link
            key={key}
            label={URL_KEY_TO_LABEL_MAP[key]}
            url={release[key]}
          />
        );
      })}
    </MCardActions>
  );
};

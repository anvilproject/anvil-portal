import { CallToActionButton } from "@databiosphere/findable-ui/lib/components/common/Button/components/CallToActionButton/callToActionButton";
import { BUTTON_PRESETS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/presets";
import { JSX } from "react";
import { MAILING_LIST_URL, NEW_TAB_HINT } from "./constants";

/**
 * Outlined secondary button that opens the AnVIL mailing list sign-up page in a new tab, and tells screen reader users so.
 * @returns The mailing list button.
 */
export const MailingListButton = (): JSX.Element => {
  return (
    <CallToActionButton
      buttonProps={{
        ...BUTTON_PRESETS.SECONDARY_OUTLINED,
        "aria-label": `Join the Mailing List ${NEW_TAB_HINT}`,
      }}
      callToAction={{ label: "Join the Mailing List", url: MAILING_LIST_URL }}
    />
  );
};

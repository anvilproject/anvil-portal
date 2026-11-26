import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import {
  MAILING_LIST_URL,
  NEW_TAB_HINT,
} from "../../../components/common/MailingListButton/constants";
import { VisuallyHidden } from "../../../components/common/VisuallyHidden/visuallyHidden.styles";
import { ROUTES } from "../../../routes/constants";

export const NAV_LINKS: NavLinkItem[] = [
  {
    label: (
      <>
        Mailing List <VisuallyHidden>{NEW_TAB_HINT}</VisuallyHidden>
      </>
    ),
    target: ANCHOR_TARGET.BLANK,
    url: MAILING_LIST_URL,
  },
  {
    label: "Help",
    url: ROUTES.HELP,
  },
  {
    label: "Privacy",
    url: ROUTES.PRIVACY,
  },
];

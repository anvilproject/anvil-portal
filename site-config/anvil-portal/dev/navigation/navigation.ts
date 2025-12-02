import { NavigationConfig } from "../../../../docs/common/entities";
import { ANVIL_CHAMPIONS } from "./champions";
import { CONSORTIA } from "./consortia";
import { RELEASES } from "./releases";
import { EVENTS } from "./events";
import { FAQ } from "./faq";
import { GUIDES } from "./guides";
import { HELP } from "./help";
import { LEARN } from "./learn";
import { NEWS } from "./news";
import { OVERVIEW } from "./overview";
import { PRIVACY } from "./privacy";
import { TEAM } from "./team";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
  ["anvil-champions"]: ANVIL_CHAMPIONS,
  consortia: CONSORTIA,
  events: EVENTS,
  faq: FAQ,
  guides: GUIDES,
  help: HELP,
  learn: LEARN,
  news: NEWS,
  overview: OVERVIEW,
  privacy: PRIVACY,
  releases: RELEASES,
  team: TEAM,
};

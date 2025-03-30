// import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Banner/constants";
import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
// import * as MDX from "../../../../components/Layout/components/Header/content";
import { Banner } from "../../../../components/Home/components/Banner/banner";

export const announcements: ComponentsConfig = [
  {
    component: Banner,
  } as ComponentConfig<typeof Banner>,
  // {
  //   component: MDX.DevelopmentModeBanner,
  //   props: {
  //     ...ALERT_PROPS,
  //   },
  // } as ComponentConfig<typeof MDX.DevelopmentModeBanner>,
];

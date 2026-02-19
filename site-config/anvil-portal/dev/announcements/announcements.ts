import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Banner/constants";
import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../components/Layout/components/Header/content";
import { Banner } from "../../../../components/Home/components/Banner/banner";

export const DEVELOPMENT_MODE_BANNER: ComponentConfig<
  typeof MDX.DevelopmentModeBanner
> = {
  component: MDX.DevelopmentModeBanner,
  props: {
    ...ALERT_PROPS,
  },
};

export const RAS_BANNER: ComponentConfig<typeof MDX.RasBanner> = {
  component: MDX.RasBanner,
  props: {
    ...ALERT_PROPS,
  },
};

export const REPOSITORY_REVIEW_BANNER: ComponentConfig<typeof Banner> = {
  component: Banner,
};

export const announcements: ComponentsConfig = [
  RAS_BANNER,
  REPOSITORY_REVIEW_BANNER,
  DEVELOPMENT_MODE_BANNER,
];

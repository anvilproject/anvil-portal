import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { Banner } from "../../../../components/Home/components/Banner/banner";
import * as MDX from "../../../../components/Layout/components/Header/content";

export const DEVELOPMENT_MODE_BANNER: ComponentConfig<
  typeof MDX.DevelopmentModeBanner
> = {
  component: MDX.DevelopmentModeBanner,
};

export const RAS_RECERTIFICATION_BANNER: ComponentConfig<
  typeof MDX.RasRecertificationBanner
> = {
  component: MDX.RasRecertificationBanner,
};

export const REPOSITORY_REVIEW_BANNER: ComponentConfig<typeof Banner> = {
  component: Banner,
};

export const announcements: ComponentsConfig = [
  RAS_RECERTIFICATION_BANNER,
  REPOSITORY_REVIEW_BANNER,
  DEVELOPMENT_MODE_BANNER,
];

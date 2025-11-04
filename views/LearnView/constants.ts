import { CTACard } from "../../components/common/Card/components/CTACard/ctaCard";
import { PenFieldIcon } from "../../components/common/CustomIcon/components/PenFieldIcon/penFieldIcon";
import { ComponentProps } from "react";
import { RocketLaunchIcon } from "../../components/common/CustomIcon/components/RocketLaunchIcon/rocketLaunchIcon";
import { FlaskGearIcon } from "../../components/common/CustomIcon/components/FlaskGearIcon/flaskGearIcon";
import { LightBulbOnIcon } from "../../components/common/CustomIcon/components/LightBulbOnIcon/lightBulbOnIcon";
import { CloudBinaryIcon } from "../../components/common/CustomIcon/components/CloudBinaryIcon/cloudBinaryIcon";
import { DatabaseIcon } from "../../components/common/CustomIcon/components/DatabaseIcon/databaseIcon";
import { StartIcon } from "../../components/common/CustomIcon/components/StartIcon/startIcon";
import { ROUTES } from "../../routes/constants";

export const CARDS: ComponentProps<typeof CTACard>[] = [
  {
    cardUrl: ROUTES.OVERVIEW,
    image: {
      alt: "AnVIL",
      height: 48,
      src: "/consortia/learn/anvil.webp",
      width: 48,
    },
    secondaryText:
      "The following is a guided walk-through of the AnVIL documentation",
    title: "What is AnVIL?",
  },
  {
    StartIcon: StartIcon,
    cardUrl: "/learn/get-started",
    secondaryText:
      "Set up your AnVIL account and access the AnVIL data ecosystem",
    title: "Get Started",
  },
  {
    StartIcon: DatabaseIcon,
    cardUrl: "/learn/find-data",
    secondaryText: "Discover and access AnVIL datasets",
    title: "Find Data",
  },
  {
    StartIcon: RocketLaunchIcon,
    cardUrl: "/learn/run-interactive-analyses",
    secondaryText:
      "Run interactive analyses with Bioconductor, RStudio, Jupyter and Galaxy",
    title: "Run Interactive Analyses",
  },
  {
    StartIcon: FlaskGearIcon,
    cardUrl: "/learn/run-analyses-workflows",
    secondaryText: "Run and scale analysis workflows with Dockstore and Terra",
    title: "Run Analyses Workflows",
  },
  {
    StartIcon: CloudBinaryIcon,
    cardUrl: "/learn/control-cloud-costs",
    secondaryText:
      "Learn how to control cloud costs and optimize your cloud usage",
    title: "Control Cloud Costs",
  },
  {
    StartIcon: PenFieldIcon,
    cardUrl: "/learn/submit-data",
    secondaryText: "View data submission guides and resources",
    title: "Submit Data",
  },
  {
    StartIcon: LightBulbOnIcon,
    cardUrl: "/learn/watch-videos-and-tutorials",
    secondaryText:
      "AnVIL tutorials and videos are available on the AnVIL YouTube channel",
    title: "Watch Tutorials & Videos",
  },
];

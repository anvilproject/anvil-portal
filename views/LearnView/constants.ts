import { CTACard } from "../../components/common/Card/components/CTACard/ctaCard";
import { PenFieldIcon } from "../../components/common/CustomIcon/components/PenFieldIcon/penFieldIcon";
import { ComponentProps } from "react";
import { RocketLaunchIcon } from "../../components/common/CustomIcon/components/RocketLaunchIcon/rocketLaunchIcon";
import { FlaskGearIcon } from "../../components/common/CustomIcon/components/FlaskGearIcon/flaskGearIcon";
import { LightBulbOnIcon } from "../../components/common/CustomIcon/components/LightBulbOnIcon/lightBulbOnIcon";
import { CloudBinaryIcon } from "../../components/common/CustomIcon/components/CloudBinaryIcon/cloudBinaryIcon";
import { AnVILIcon } from "../../components/common/CustomIcon/components/AnVILIcon/AnVILIcon";

export const CARDS: ComponentProps<typeof CTACard>[] = [
  {
    StartIcon: AnVILIcon,
    cardUrl: "/learn/getting-started",
    secondaryText:
      "Set up your AnVIL account and access the AnVIL data ecosystem",
    title: "Getting Started",
  },
  {
    StartIcon: AnVILIcon,
    cardUrl: "/learn/accessing-data",
    secondaryText: "Discover and access AnVIL datasets",
    title: "Accessing Data",
  },
  {
    StartIcon: RocketLaunchIcon,
    cardUrl: "/learn/interactive-analysis",
    secondaryText:
      "Run interactive analyses with Bioconductor, RStudio, Jupyter and Galaxy",
    title: "Interactive Analysis",
  },
  {
    StartIcon: FlaskGearIcon,
    cardUrl: "/learn/analysis-workflows",
    secondaryText: "Run and scale analysis workflows with Dockstore and Terra",
    title: "Analysis Workflows",
  },
  {
    StartIcon: CloudBinaryIcon,
    cardUrl: "/learn/cloud-costs",
    secondaryText:
      "Learn how to control cloud costs and optimize your cloud usage",
    title: "Controlling Cloud Costs",
  },
  {
    StartIcon: PenFieldIcon,
    cardUrl: "/learn/submitting-data",
    secondaryText: "View data submission guides and resources",
    title: "Submitting Data",
  },
  {
    StartIcon: LightBulbOnIcon,
    cardUrl: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
    secondaryText:
      "AnVIL tutorials and videos are available on the AnVIL YouTube channel",
    title: "Tutorials & Videos",
  },
];

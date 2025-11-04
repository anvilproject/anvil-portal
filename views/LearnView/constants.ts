import { CTACard } from "../../components/common/Card/components/CTACard/ctaCard";
import { UploadFileIcon } from "../../components/common/CustomIcon/components/UploadFileIcon/uploadFileIcon";
import { ComponentProps } from "react";
import { RocketLaunchIcon } from "../../components/common/CustomIcon/components/RocketLaunchIcon/rocketLaunchIcon";
import { FlaskGearIcon } from "../../components/common/CustomIcon/components/FlaskGearIcon/flaskGearIcon";
import { AnimatedImagesIcon } from "../../components/common/CustomIcon/components/AnimatedImagesIcon/animatedImagesIcon";
import { CloudBinaryIcon } from "../../components/common/CustomIcon/components/CloudBinaryIcon/cloudBinaryIcon";
import { DatabaseSearchIcon } from "../../components/common/CustomIcon/components/DatabaseSearchIcon/databaseSearchIcon";
import { StartIcon } from "../../components/common/CustomIcon/components/StartIcon/startIcon";
import { ROUTES } from "../../routes/constants";
import { SmbShareIcon } from "../../components/common/CustomIcon/components/SmbShareIcon/smbShareIcon";

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
    StartIcon: RocketLaunchIcon,
    cardUrl: "/learn/get-started",
    secondaryText:
      "Set up your AnVIL account and access the AnVIL data ecosystem",
    title: "Get Started",
  },
  {
    StartIcon: AnimatedImagesIcon,
    cardUrl: "/learn/watch-videos-and-tutorials",
    secondaryText:
      "AnVIL tutorials and videos are available on the AnVIL YouTube channel",
    title: "Watch Tutorials & Videos",
  },
  {
    StartIcon: DatabaseSearchIcon,
    cardUrl: "/learn/find-data",
    secondaryText: "Discover and access AnVIL datasets",
    title: "Find Data",
  },
  {
    StartIcon: UploadFileIcon,
    cardUrl: "/learn/submit-data",
    secondaryText: "View data submission guides and resources",
    title: "Submit Data",
  },
  {
    StartIcon: SmbShareIcon,
    cardUrl: "/learn/access-data-services",
    secondaryText:
      "The following is a guided walk-through of the AnVIL documentation",
    title: "Access Data Services",
  },
  {
    StartIcon: StartIcon,
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
];

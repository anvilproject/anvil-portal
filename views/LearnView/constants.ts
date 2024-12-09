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
      "The following is a guided walk-through of the AnVIL documentation",
    title: "AnVIL Overview",
  },
  {
    StartIcon: RocketLaunchIcon,
    cardUrl: "/learn",
    secondaryText:
      "The following is a guided walk-through of the AnVIL documentation",
    title: "Account Setup",
  },
  {
    StartIcon: FlaskGearIcon,
    cardUrl: "/learn",
    secondaryText:
      "The following is a guided walk-through of the AnVIL documentation",
    title: "Setting up Lab",
  },
  {
    StartIcon: PenFieldIcon,
    cardUrl: "/learn",
    secondaryText:
      "The following is a guided walk-through of the AnVIL documentation",
    title: "Data Submission",
  },
  {
    StartIcon: LightBulbOnIcon,
    cardUrl: "/learn",
    secondaryText:
      "The following is a guided walk-through of the AnVIL documentation",
    title: "Tutorials & Videos",
  },
  {
    StartIcon: CloudBinaryIcon,
    cardUrl: "/learn",
    secondaryText:
      "The following is a guided walk-through of the AnVIL documentation",
    title: "Controlling cloud costs",
  },
];

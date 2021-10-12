/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - stats component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import { StatsStaticQuery } from "../../hooks/stats-query";
import Stat from "../stat/stat";
import * as NumberFormatService from "../../utils/number-format.service";

// Styles
import * as compStyles from "./stats.module.css";

function formatStats(count: number): number {
  return NumberFormatService.format(count, 1);
}

const Stats: FC = (): JSX.Element => {
  const stats = StatsStaticQuery();
  const cohorts = Math.floor(formatStats(stats.cohorts) / 50) * 50;
  const samples = Math.floor(formatStats(stats.samples) / 100) * 100;
  const size = formatStats(stats.size);

  return (
    <div className={compStyles.stats}>
      <Stat stat={cohorts}>Cohorts</Stat>
      <Stat stat={size}>Petabytes</Stat>
      <Stat stat={samples} unit="thousand">
        Participants
      </Stat>
    </div>
  );
};

export default Stats;

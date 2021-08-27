/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard detail stats component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as NumberFormatService from "../../../utils/number-format.service";

// Styles
import compStyles from "./dashboard-study-stats.module.css";

export interface IStat {
  cohorts: number;
  samples: number;
  size: number;
  subjects: number;
}

interface DashboardStudyStatProps {
  studyStat: IStat;
}

function DashboardStudyStats(props: DashboardStudyStatProps): JSX.Element {
  const { studyStat } = props;
  const { cohorts, samples, size, subjects } = studyStat;

  const formatSize = (count: number): string => {
    const sizeTB = NumberFormatService.formatSizeToTB(count);
    return `${sizeTB} TB`;
  };

  const formatStats = (count: number): string => {
    return count.toLocaleString();
  };

  return (
    <div className={compStyles.collection}>
      <h3>Stats</h3>
      <div className={compStyles.stats}>
        <div className={compStyles.stat}>
          <span className={compStyles.count}>{formatStats(cohorts)}</span>
          <span className={compStyles.label}>Cohorts</span>
        </div>
        <div className={compStyles.stat}>
          <span className={compStyles.count}>{formatStats(samples)}</span>
          <span className={compStyles.label}>Samples</span>
        </div>
        <div className={compStyles.stat}>
          <span className={compStyles.count}>{formatStats(subjects)}</span>
          <span className={compStyles.label}>Participants</span>
        </div>
        <div className={compStyles.stat}>
          <span className={compStyles.count}>{formatSize(size)}</span>
          <span className={compStyles.label}>Size</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardStudyStats;

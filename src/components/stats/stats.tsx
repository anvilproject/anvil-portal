import React, { FC } from "react";
import Stat from "../stat/stat";
import * as compStyles from "./stats.module.css";

const Stats: FC = (): JSX.Element => {
  return (
    <div className={compStyles.stats}>
      <Stat stat={500}>Cohorts</Stat>
      <Stat stat={600}>Petabytes</Stat>
      <Stat stat={4} unit="thousand">
        Participants
      </Stat>
    </div>
  );
};

export default Stats;

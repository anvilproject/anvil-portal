/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - stats component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {StatsStaticQuery} from "../../hooks/stats-query";
import Stat from "../stat/stat";
import * as NumberFormatService from "../../utils/number-format.service";
import * as StatsService from "../../utils/stats.service";

// Styles
import compStyles from "./stats.module.css";

function Stats() {

    const stats = StatsService.getStats(StatsStaticQuery());

    const formatStats = (count) => {
        return NumberFormatService.format(count, {
            PB: 1
        });
    };

    return (
        <div className={compStyles.stats}>
            <Stat stat={formatStats(stats.consortia)}>consortia</Stat>
            <Stat stat={formatStats(stats.cohorts)}>cohorts</Stat>
            <Stat stat={formatStats(stats.subjects)}>subjects</Stat>
            <Stat stat={formatStats(stats.samples)}>samples</Stat>
            <Stat stat={formatStats(stats.size)}>size</Stat>
        </div>
    );
}

export default Stats;

/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - stats component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {StatsStaticQuery} from "../../hooks/statsQuery";
import * as NumberFormatService from "../../utils/number-format.service";
import * as StatsService from "../../utils/stats.service";
import Stat from "../stat/stat";

// Styles
import compStyles from "./stats.module.css";

class Stats extends React.Component {

    formatStats = (count) => {
        return NumberFormatService.format(count, {
            PB: 1
        });
    };

    render() {
        const {stats} = this.props;
        return (
            <div className={compStyles.stats}>
                <Stat stat={this.formatStats(stats.sources)}>programs</Stat>
                <Stat stat={this.formatStats(stats.projects)}>cohorts</Stat>
                <Stat stat={this.formatStats(stats.subjects)}>subjects</Stat>
                <Stat stat={this.formatStats(stats.samples)}>samples</Stat>
                <Stat stat={this.formatStats(stats.size)}>size</Stat>
            </div>
        );
    }
}

export default () => {

    const stats = StatsService.getStats(StatsStaticQuery());

    return (
        <Stats stats={stats}/>
    );
}

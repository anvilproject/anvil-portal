/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL release roadmap component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {roadMapStaticQuery} from "../../hooks/roadMapQuery";

// Styles
import compStyles from "./roadMap.module.css";

let classNames = require("classnames");

class RoadMap extends React.Component {

    redirect = (linkTo) => {

        window.open(linkTo)
    };

    showQuarter = (quarter) => {

        const {display} = quarter;

        if ( !display ) {

            return false;
        }

        const {tools, platforms} = display;

        return tools || platforms;
    };

    render() {
        const {roadMap} = this.props;

        const Bubble = (props) => {

            const {className, item} = props,
                {link, name} = item;

            return (
                <span className={classNames(compStyles.bubble, className)} onClick={() => this.redirect(link)}>
                    <span>{name}</span>
                </span>
            )
        };

        const Key = () => {

            return (
                <div className={compStyles.key}>
                    <span className={compStyles.tool}>Tools</span>
                    <span className={compStyles.platform}>Platforms</span>
                </div>
            )
        };

        const Quarter = (props) => {

            const {items} = props,
                {quarter, display} = items,
                {tools, platforms} = display;

            return (
                <div className={compStyles.quarter}>
                    <div className={compStyles.stack}>
                        {platforms ? platforms.map((platform, k) =>
                            <Bubble key={k} className={compStyles.platform} item={platform}/>) : null}
                        {tools ? tools.map((tool, l) =>
                            <Bubble key={l} className={compStyles.tool} item={tool}/>) : null}
                    </div>
                    <div className={compStyles.label}>{quarter}</div>
                </div>
            )
        };

        return (
            <div className={compStyles.roadmap}>
                <Key/>
                {roadMap.map((quarter, i) =>
                    this.showQuarter(quarter) ? <Quarter key={i} items={quarter}/> : null
                )}
            </div>
        );
    }
}

export default () => {

    const roadMap = roadMapStaticQuery();

    return (
        roadMap ? <RoadMap roadMap={roadMap}/> : null
    );
}

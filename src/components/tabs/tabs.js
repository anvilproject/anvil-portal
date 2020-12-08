/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL tabs component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Tab from "./tab/tab";

// Styles
import compStyles from "./tabs.module.css";

function Tabs(props) {

    const {tabs} = props;

    return (
        <span className={compStyles.tabs}>
            {tabs.map((tab, t) => <Tab key={t} tab={tab}/>)}
        </span>
    );
}

export default Tabs;

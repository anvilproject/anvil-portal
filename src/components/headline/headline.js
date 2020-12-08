/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - headline component. Displays page title and tabs.
 */

// Core dependencies
import React from "react";

// App dependencies
import Tabs from "../tabs/tabs";
import Title from "../title/title";

// Styles
import compStyles from "./headline.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

function Headline(props) {

    const {navigations} = props,
        {tabs, title} = navigations || {};
    const showTabs = tabs && tabs.length > 0 && tabs[0].name;

    return (
        <div className={classNames(globalStyles.container, compStyles.headline)}>
            <Title title={title}/>
            {showTabs ? <Tabs tabs={tabs}/> : null}
        </div>
    );
}

export default Headline;

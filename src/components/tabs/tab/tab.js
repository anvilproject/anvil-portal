/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL tab component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies

// Styles
import compStyles from "./tab.module.css";

const classNames = require("classnames");

function Tab(props) {

    const {tab} = props,
        {active, name, path} = tab || {};

    return (
        <Link className={classNames({[compStyles.active]: active}, compStyles.tab)} to={path}>{name}</Link>
    );
}

export default Tab;

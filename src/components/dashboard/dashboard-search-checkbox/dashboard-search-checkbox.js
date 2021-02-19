/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search checkbox component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./dashboard-search-checkbox.module.css";

const classNames = require("classnames");

function DashboardSearchCheckbox(props) {

    const {checkbox, onHandleChecked, termsCount, termsChecked} = props,
        {label, value} = checkbox;
    const count = termsCount.has(value) ? termsCount.get(value) : 0;
    const checked = termsChecked.get(value);
    const disabled = count === 0;

    const onHandleClick = () => {

        onHandleChecked({checked: !checked, value: value});
    };

    return (
        <span className={classNames({[compStyles.active]: checked}, compStyles.checkbox, {[compStyles.disabled]: disabled})} onClick={() => onHandleClick()} role="presentation">
            <span className={compStyles.check}>
                <span className={classNames("material-icons-round", compStyles.icon)}>done</span>
            </span>
            <span className={compStyles.label}>{label}</span>
            <span className={compStyles.count}>{count}</span>
        </span>
    )
}

export default DashboardSearchCheckbox;

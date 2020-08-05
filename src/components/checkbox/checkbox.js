/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - checkbox component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./checkbox.module.css";

let classNames = require("classnames");

class Checkbox extends React.Component {

    shouldComponentUpdate(prevProps) {

        const {checkbox} = this.props;

        return prevProps.checkbox !== checkbox;
    }

    onHandleClick = () => {

        const {checkbox, property, onHandleChecked} = this.props,
            {checked, value} = checkbox;

        onHandleChecked({checked: !checked, property: property, value: value});
    };

    render() {
        const {checkbox} = this.props,
            {checked, label} = checkbox;
        return (
            <span className={compStyles.checkbox} onClick={this.onHandleClick} role="presentation">
                <span className={classNames({[compStyles.active]: checked}, compStyles.check)}>
                    <span className={classNames("material-icons-round", compStyles.icon)}>done</span>
                </span>
                <span className={compStyles.label}>{label}</span>
            </span>
        )
    };
}

export default Checkbox;

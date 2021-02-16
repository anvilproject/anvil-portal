/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search checkbox component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboard from "../context-dashboard/context-dashboard";

// Styles
import compStyles from "./dashboard-search-checkbox.module.css";

const classNames = require("classnames");

class DashboardSearchCheckbox extends React.Component {

    shouldComponentUpdate(nextProps) {

        const {checked, count} = this.props;

        const changeChecked = checked !== nextProps.checked;
        const changeCount = count !== nextProps.count;

        return changeChecked || changeCount;
    }

    onHandleClick = () => {

        const {checked, value, onHandleChecked} = this.props;

        onHandleChecked({checked: !checked, value: value});
    };

    render() {
        const {checked, count, disabled, label} = this.props;
        return (
            <span className={classNames({[compStyles.active]: checked}, compStyles.checkbox, {[compStyles.disabled]: disabled})} onClick={this.onHandleClick} role="presentation">
                <span className={compStyles.check}>
                    <span className={classNames("material-icons-round", compStyles.icon)}>done</span>
                </span>
                <span className={compStyles.label}>{label}</span>
                <span className={compStyles.count}>{count}</span>
            </span>
        )
    };
}

export default (props) => {

    const {checkbox} = props,
        {label, value} = checkbox;

    const searching = useContext(ContextDashboard),
        {termsChecked, termsCount, onHandleChecked} = searching;

    /* Get the count. */
    let count = 0;

    if ( termsCount.has(value) ) {

        count = termsCount.get(value);
    }

    const checked = termsChecked.get(value);
    const disabled = count === 0;

    return (
        <DashboardSearchCheckbox checked={checked} count={count} disabled={disabled} label={label} value={value} onHandleChecked={onHandleChecked}/>
    )
}

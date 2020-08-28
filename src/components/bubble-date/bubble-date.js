/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * This component displays a date value inside an AnVIL-style bubble. 
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./bubble-date.module.css";
let classNames = require("classnames");

class BubbleDate extends React.Component {

    render() {
        
        const {dateBubble, disabled} = this.props;
        const [month, dayOfMonth, year] = dateBubble || [];

        return (
            <div className={classNames(compStyles.bubbleDate, {[compStyles.disabled]: disabled})}>
                <div className={compStyles.bubbleDateText}>
                    <div className={compStyles.bubbleDayOfMonth}>
                        {dayOfMonth}
                    </div>
                    <div className={compStyles.bubbleMonthAndYear}>
                        <div className={compStyles.bubbleMonth}>
                            {month}
                        </div>
                        <div className={compStyles.bubbleYear}>
                            {year}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BubbleDate;

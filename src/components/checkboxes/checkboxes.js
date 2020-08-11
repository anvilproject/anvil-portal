/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - checkboxes component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Checkbox from "../checkbox/checkbox";
import DataSearchPanel from "../data-search-panel/data-search-panel";

class Checkboxes extends React.Component {

    render() {
        const {checkboxes, groupName} = this.props;
        return (
            <DataSearchPanel>
                <span id="group">
                    <span>{groupName}</span>
                    <span>Count</span>
                </span>
                {checkboxes.map((checkbox, c) => <Checkbox key={c} checkbox={checkbox}/>)}
            </DataSearchPanel>
        )
    };
}

export default Checkboxes;

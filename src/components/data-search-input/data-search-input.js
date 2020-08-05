/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search input component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataSearchPanel from "../data-search-panel/data-search-panel";

// Styles
import compStyles from "./data-search-input.module.css";

class DataSearchInput extends React.Component {

    shouldComponentUpdate(prevProps) {

        const {inputValue} = this.props;

        return prevProps.inputValue !== inputValue;
    }

    render() {
        const {inputValue, onHandleInput} = this.props;
        return (
            <DataSearchPanel>
                <span id="group-label">Search</span>
                <input className={compStyles.input}
                       type="text"
                       placeholder={"e.g. disease, study name, dbGaP Id"}
                       value={inputValue}
                       onChange={(e) => onHandleInput(e)}/>
            </DataSearchPanel>
        )
    }
}

export default DataSearchInput;

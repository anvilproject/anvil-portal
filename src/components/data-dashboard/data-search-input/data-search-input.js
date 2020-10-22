/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data search input component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextDashboardFilter from "../context-dashboard-filter/context-dashboard-filter";
import DataSearchPanel from "../data-search-panel/data-search-panel";

// Styles
import compStyles from "./data-search-input.module.css";

let classNames = require("classnames");

class DataSearchInput extends React.Component {

    shouldComponentUpdate(nextProps) {

        const {inputValue} = this.props;

        return inputValue !== nextProps.inputValue;
    }

    render() {
        const {inputValue, onHandleClearInput, onHandleInput} = this.props;
        const showClear = !!inputValue;
        return (
            <DataSearchPanel>
                <span id="group">Search</span>
                <span className={compStyles.search}>
                    <input className={compStyles.input}
                       type="text"
                       placeholder={"e.g. disease, study name, dbGaP Id"}
                       value={inputValue}
                       onChange={(e) => onHandleInput(e)}/>
                    <span className={classNames(compStyles.icon, "material-icons-round", {[compStyles.active]: showClear})}
                          role="presentation"
                          onClick={onHandleClearInput}
                          onKeyDown={onHandleClearInput}>close</span>
                </span>
            </DataSearchPanel>
        )
    }
}

export default () => {

    const {inputValue, onHandleClearInput, onHandleInput} = useContext(ContextDashboardFilter);

    return (
        <DataSearchInput inputValue={inputValue} onHandleClearInput={onHandleClearInput} onHandleInput={(e) => onHandleInput(e)}/>
    )
};

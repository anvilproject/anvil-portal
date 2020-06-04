/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - expansion panel component used by the data study card component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";

// Styles
import compStyles from "./expansion-panel.module.css";

let classNames = require("classnames");

class ExpansionPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({expanded: false});
    }

    toggleExpansionPanel = () => {

        this.setState({expanded: !this.state.expanded});
    };

    render() {
        const {children, panelTitle} = this.props,
            {expanded} = this.state;
        return (
            <>
                <ClickHandler className={classNames({[compStyles.expanded]: expanded}, compStyles.panel)}
                              clickAction={() => this.toggleExpansionPanel()}
                              label={"expand"}
                              tag={"div"}>
                        <span>{panelTitle}</span>
                        <i className={classNames("material-icons-outlined")}>expand_more</i>
                </ClickHandler>
                <div className={classNames(compStyles.accordion, {[compStyles.collapsed]: !expanded}, {[compStyles.expanded]: expanded})}>{children}</div>
            </>
        );
    }
}

export default ExpansionPanel;

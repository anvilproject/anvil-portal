/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL edit content component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./editContent.module.css";

let classNames = require("classnames");

class EditContent extends React.Component {

    redirect = (editPath) => {

        window.open(editPath);
    };

    render() {
        const {docPath} = this.props,
            editPath = 'https://github.com/anvilproject/anvil-portal/tree/staging/content' + docPath + '.md';

        return (
            <div className={classNames(compStyles.editContent)}>
                <a href={editPath} className={compStyles.improve} target="_blank" rel="noopener noreferrer">Improve this page</a>
            </div>
        );
    }
}

export default (props) => {
    return (
        <EditContent {...props}/>
    )
}

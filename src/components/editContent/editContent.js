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

    render() {
        const {docPath} = this.props,
        editPath = 'https://github.com/anvilproject/anvil-portal/tree/staging/content' + docPath + '.md';

        return (
            <a className={classNames(compStyles.editContent, compStyles.editContentSeparator)}
               href={editPath} target='_blank' rel='noopener noreferrer'>Improve this page</a>
        );
    }
}

export default (props) => {
    return (
        <EditContent {...props}/>
    )
}

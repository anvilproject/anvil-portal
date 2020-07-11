/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Content displayed inside list item.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as DOMService from "../../utils/dom.service";

// Styles
import compStyles from "./list-item-content.module.css";

class ListItemContent extends React.Component {

    /**
     * Set banner height and scroll defaults. Create ref for handling tracking of external links.
     */
    constructor(props) {

        super(props);
        this.contentEl = React.createRef();
    }

    /**
     * Set up click handler on top-level list item content element.
     */
    componentDidMount() {

        this.contentEl.current.addEventListener("click", this.onClick, {passive: false});
    }

    /**
     * Prevent propagation on anchors within the list item content. If we let the event bubble here, then any link action
     * on the parent list item container will be visit instead of the link that was clicked on in the content.
     */
    onClick = (e) => {

        if ( DOMService.isAnchor(e.target) ) {
            e.stopPropagation();
        }
    };
    

    render() {
        const {children} = this.props;
        return (
            <div className={compStyles.listItemContent}
                 ref={this.contentEl}>
                {children}
            </div>
        );
    }
}

export default ListItemContent;

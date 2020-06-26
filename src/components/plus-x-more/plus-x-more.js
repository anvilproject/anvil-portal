/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - plus x more component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./plus-x-more.module.css";

class PlusXMore extends React.Component {

    constructor(props) {
        super(props);
        this.handleShowMore = this.handleShowMore.bind(this);
    }

    handleShowMore = () => {

        const { showMore } = this.props;

        this.props.onShowMore(!showMore);
    };

    render() {
        const { children, moreCount } = this.props;
        const more = moreCount > 0;
        const buttonText = ` + ${moreCount} more`;
        return (
            <span>
                <button className={compStyles.plusMore} onClick={() => this.handleShowMore()}>{children}
                    {more ? <span>{buttonText}</span> : null}</button>
            </span>
        );
    }
}

export default PlusXMore;

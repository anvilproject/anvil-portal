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

        const {showMore} = this.props;

        this.props.onShowMore(!showMore);
    };

    render() {
        const {children, moreCount, singleCount} = this.props;
        const more = moreCount > 0;
        const buttonText = singleCount ? " + more" : ` + ${moreCount} more`;
        return (
            <span>
                {children}
                {more || singleCount ? <button className={compStyles.plusMore} onClick={() => this.handleShowMore()}><span>{buttonText}</span></button> : null}
            </span>
        );
    }
}

export default PlusXMore;

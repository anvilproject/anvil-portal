/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Nav from "../nav/nav";
import Outline from "../outline/outline";
import Spy from "../spy/spy";

// Styles
import compStyles from "./article.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

// Template variables
const ALIGNMENT = {
    "LEFT": "left"
};

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({activeOutline: ""});
    }

    onOutlineChange = (event) => {

        this.setState({activeOutline: event});
    };

    render() {
        const {bannerHeight, children, docPath, noSpy, styles} = this.props,
            {alignment} = styles || {},
        dashboard = docPath === "/data/data";
        const left = alignment === ALIGNMENT.LEFT;

        return (
            <section className={classNames(compStyles.article, {[compStyles.overflow]: dashboard})}>
                <div className={classNames(globalStyles.container, compStyles.container)}>
                    <Nav bannerHeight={bannerHeight} docPath={docPath}/>
                    <div className={classNames(compStyles.contentPositioner, {[compStyles.left]: left})}>
                        <div className={compStyles.contentContainer}>
                            {noSpy ? children : <Spy onOutlineChange={this.onOutlineChange.bind(this)}>{children}</Spy>}
                            {dashboard ? null : <Outline bannerHeight={bannerHeight} activeOutline={this.state.activeOutline} docPath={docPath}/>}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Article;

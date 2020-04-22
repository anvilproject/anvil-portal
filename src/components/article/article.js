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
import globalStyles from "../../styles/global.module.css";
import compStyles from "./article.module.css";

const classNames = require("classnames");

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({activeOutline: ""});
    }

    onOutlineChange = (event) => {

        this.setState({activeOutline: event});
    };

    render() {
        const {bannerHeight, children, docPath, noSpy} = this.props,
        dashboard = docPath === "/data/data";

        return (
            <section className={classNames(compStyles.article, {[compStyles.overflow]: dashboard})}>
                <div className={classNames(globalStyles.container, compStyles.container)}>
                    <Nav bannerHeight={bannerHeight} docPath={docPath}/>
                    <div className={compStyles.contentPositioner}>
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

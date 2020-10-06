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
import * as StylesService from "../../utils/styles.service";

// Styles
import compStyles from "./article.module.css";
import globalStyles from "../../styles/global.module.css";

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
        const {bannerHeight, children, docPath, noSpy, showOutline, styles} = this.props,
            {alignment} = styles || {};
        const left = StylesService.isPageAlignmentLeft(alignment);
        const useOutline = showOutline;
        const useSpy = showOutline && !noSpy;

        return (
            <section className={compStyles.article}>
                <div className={classNames(globalStyles.container, compStyles.container)}>
                    {left ? null : <Nav bannerHeight={bannerHeight} docPath={docPath} leftAlignPage={left}/>}
                    <div className={classNames(compStyles.contentPositioner, {[compStyles.left]: left})}>
                        <div className={compStyles.contentContainer}>
                            {useSpy ? <Spy onOutlineChange={this.onOutlineChange.bind(this)}>{children}</Spy> : children}
                            {useOutline ? <Outline bannerHeight={bannerHeight} activeOutline={this.state.activeOutline} docPath={docPath}/> : null}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Article;

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
        const {children, docPath} = this.props;
        return (
            <section className={classNames(globalStyles.flex, compStyles.article)}>
                <div className={classNames(globalStyles.container, compStyles.container)}>
                    <Nav docPath={docPath}/>
                    <Spy onOutlineChange={this.onOutlineChange.bind(this)}>{children}</Spy>
                    <Outline activeOutline={this.state.activeOutline} docPath={docPath}/>
                </div>
            </section>
        );
    }
}

export default Article;

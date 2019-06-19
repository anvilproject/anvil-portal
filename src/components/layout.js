/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL layout component; works as wrapper around site component.
 */

// Core dependencies
import Helmet from "react-helmet";
import React from "react";

// App dependencies
import Footer from "./footer/footer";
import Main from "./main/main";
import Header from "./header/header";

// Styles
import compStyles from "./layout.module.css";
import "../styles/globalStyles.css";

let classNames = require('classnames');

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {noScroll: false};
    }

    onMenuOpen = (event) => {
        this.setState({noScroll: !event});
    };

    render() {
        const {children, docPath, homePage, hideNav} = this.props;
        return (
            <div>
                <Helmet>
                    <title>The AnVIL</title>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300&display=swap"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <link href="https://fonts.googleapis.com/css?family=Barlow:300,400|Open+Sans:300,400,600,700&display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round"/>
                </Helmet>
                <div className={classNames(compStyles.site, {[compStyles.menuOpen]: this.state.noScroll})}>
                    <Header homePage={homePage} onMenuOpen={this.onMenuOpen.bind(this)}/>
                    {homePage ? children : <Main docPath={docPath} hideNav={hideNav}>{children}</Main>}
                    <Footer homePage={homePage}/>
                </div>
            </div>
        )
    }
}

export default Layout;

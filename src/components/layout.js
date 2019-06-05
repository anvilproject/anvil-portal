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

class Layout extends React.Component {

    render() {
        const {children, theme} = this.props;
        return (
            <div>
                <Helmet>
                    <title>The AnVIL</title>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300&display=swap"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <link
                        href="https://fonts.googleapis.com/css?family=Alegreya+Sans:700%7CNunito%7COld+Standard+TT:700%7CRoboto+Condensed%7CRoboto+Mono%7CRufina:700%7CSource+Code+Pro%7CSource+Sans+Pro:600&display=swap"
                        rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans%7CBarlow%7CMandali%7CNoto+Sans+HK%7COpen+Sans&display=swap" rel="stylesheet"/>
                </Helmet>
                <div className={compStyles.site}>
                    <Header theme={theme}/>
                    <Main>{children}</Main>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Layout;

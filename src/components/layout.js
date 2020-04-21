/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL layout component; works as wrapper around site component.
 */

// Core dependencies
import React from "react";

// App dependencies
import BannerPrivacy from "./banner-privacy/banner-privacy";
import Footer from "./footer/footer";
import Header from "./header/header";
import Main from "./main/main";
import SEO from "./seo/seo";

// Styles
import compStyles from "./layout.module.css";

let classNames = require('classnames');

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bannerHeight: 0, noScroll: false};
    }

    onBannerHeightChange = (event) => {

        this.setState({bannerHeight: event});
    };

    onMenuOpen = (event) => {

        this.setState({noScroll: !event});
    };

    render() {
        const {children, description, docPath, homePage, noSpy, title} = this.props;
        return (
            <div>
                <SEO description={description} title={title}/>
                <div className={classNames(compStyles.site, {[compStyles.menuOpen]: this.state.noScroll})}>
                    <Header onMenuOpen={this.onMenuOpen.bind(this)}/>
                    <Main bannerHeight={this.state.bannerHeight} docPath={docPath} homePage={homePage} noSpy={noSpy}>{children}</Main>
                    <BannerPrivacy onBannerHeightChange={this.onBannerHeightChange.bind(this)}/>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Layout;

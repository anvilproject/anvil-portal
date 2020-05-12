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
import PageHead from "./page-head/page-head";
import SEO from "./seo/seo";
import * as AnvilGTMService from "../utils/anvil-gtm/anvil-gtm.service";
import * as DOMService from "../utils/dom.service";

// Styles
import compStyles from "./layout.module.css";


let classNames = require('classnames');

class Layout extends React.Component {

    /**
     * Set banner height and scroll defaults. Create ref for handling tracking of external links. 
     */
    constructor(props) {

        super(props);
        this.state = {bannerHeight: 0, noScroll: false};
        this.containerEl = React.createRef();
    }

    /**
     * Set up tracking of external links.
     */
    componentDidMount() {

        this.containerEl.current.addEventListener("click", this.onClick, {passive: true});
    }

    onBannerHeightChange = (event) => {

        this.setState({bannerHeight: event});
    };
    
    onClick = (e) => {

        const target = e.target;
        if ( !DOMService.isAnchor(target) ) {
            return;
        }

        const url = target.getAttribute("href");
        if ( DOMService.isHrefExternal(url) || DOMService.isMailTo(url) ) {

            const linkText = target.innerText;
            AnvilGTMService.trackExternalLinkClicked(url, linkText);
            
        }
    };

    onMenuOpen = (event) => {

        this.setState({noScroll: !event});
    };

    render() {
        const {children, description, docPath, homePage, noSpy, title} = this.props,
            site = "The AnVIL";
            return (
            <div ref={this.containerEl}>
                <PageHead site={site}/>
                <SEO description={description} site={site} title={title}/>
                <div className={classNames(compStyles.site, {[compStyles.menuOpen]: this.state.noScroll})}>
                    <Header onMenuOpen={this.onMenuOpen.bind(this)}/>
                    <Main bannerHeight={this.state.bannerHeight} docPath={docPath} homePage={homePage} noSpy={noSpy}>{children}</Main>
                    <BannerPrivacy onBannerHeightChange={this.onBannerHeightChange.bind(this)}/>
                    <Footer/>
                    <div id="portal"/>
                </div>
            </div>
        )
    }
}

export default Layout;

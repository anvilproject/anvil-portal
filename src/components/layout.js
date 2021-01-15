/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL layout component; works as wrapper around site component.
 */

// Core dependencies
import React, {useEffect, useRef, useState} from "react";

// App dependencies
import BannerPrivacy from "./banner-privacy/banner-privacy";
import Footer from "./footer/footer";
import Header from "./header/header";
import Main from "./main/main";
import Modal from "./modal/modal";
import PageHead from "./page-head/page-head";
import ProviderModal from "./modal/provider-modal/provider-modal";
import SEO from "./seo/seo";
import * as AnvilGTMService from "../utils/anvil-gtm/anvil-gtm.service";
import * as DOMService from "../utils/dom.service";

// Styles
import compStyles from "./layout.module.css";

let classNames = require('classnames');

function Layout(props) {

    const {children, description, docPath, homePage, navigations, ncpi, noSpy, showOutline, styles, title} = props;
    const siteRef = useRef(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const [siteScrollable, setSiteScrollable] = useState(false);
    const site = ncpi ? "NCPI" : "The AnVIL";

    const onHandleTrackingExternalLinks = (e) => {

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

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Set up tracking of external links - add event listener. */
    useEffect(() => {

        const siteRefEl = siteRef.current;
        siteRefEl.addEventListener("click", onHandleTrackingExternalLinks, {passive: true});

        return() => {

            siteRefEl.removeEventListener("click", onHandleTrackingExternalLinks, {passive: true});
        }
    }, []);

    return (
        <div ref={siteRef}>
            <PageHead pageTitle={title} site={site}/>
            <SEO description={description} ncpi={ncpi} site={site} title={title}/>
            <ProviderModal>
                <div className={classNames(compStyles.site, {[compStyles.noScroll]: !siteScrollable})}>
                    <Header ncpi={ncpi} setSiteScrollable={setSiteScrollable}/>
                    <Main bannerHeight={bannerHeight}
                          docPath={docPath}
                          homePage={homePage}
                          navigations={navigations}
                          noSpy={noSpy}
                          showOutline={showOutline}
                          styles={styles}>{children}</Main>
                    <BannerPrivacy setBannerHeight={setBannerHeight}/>
                    <Footer/>
                    <div id="portal"/>
                </div>
                <Modal/>
            </ProviderModal>
        </div>
    )
}

export default Layout;
